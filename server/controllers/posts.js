import PostMessage from '../models/postMessage.js';
import cloudinary from '../utils/cloudinary.js';

const defaultImageUrl =
  'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
      .populate('creator', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json(postMessages);
  } catch (err) {
    console.log(err.message, err);
    res.status(500).json({ msg: 'Oops! Something went wrong, please try again!' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, message, tags, selectedFile } = req.body;

    if (!title || !message)
      return res.status(400).json({ msg: 'Title and message cannot be empty!' });

    if (title.length > 24)
      return res.status(400).json({ msg: 'Title too long! (Max 16 Characters)' });
    if (message.length > 160)
      return res.status(400).json({ msg: 'Message too long! (Max 160 Characters)' });

    const post = new PostMessage({
      title,
      message,
      tags,
    });
    post.creator = req.user.id;

    if (selectedFile !== '') {
      const imageRes = await cloudinary.v2.uploader.upload(selectedFile, {
        upload_preset: 'dp_memories',
      });

      post.selectedFile = {
        cloudId: imageRes.public_id,
        url: imageRes.url,
      };
    } else {
      post.selectedFile = {
        cloudId: -1,
        url: defaultImageUrl,
      };
    }

    const savedPost = await post.save();

    const response = await PostMessage.populate(savedPost, {
      path: 'creator',
      model: 'User',
      select: '-password',
    });

    res.status(201).json(response);
  } catch (err) {
    console.log(err.message, err);
    res.status(500).json({ msg: 'Oops! Something went wrong, please try again!' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postToUpdate = await PostMessage.findOne({
      creator: req.user.id,
      _id: req.params.id,
    });

    if (!postToUpdate)
      return res.status(400).json({
        msg: 'No post found with this ID that belongs to the current user!',
      });

    const { id: _id } = req.params;
    const post = req.body;

    if (postToUpdate.selectedFile !== post.selectedFile) {
      const imageRes = await cloudinary.v2.uploader.upload(post.selectedFile, {
        upload_preset: 'dp_memories',
      });

      post.selectedFile = {
        cloudId: imageRes.public_id,
        url: imageRes.url,
      };

      if (postToUpdate.selectedFile.cloudId !== -1) {
        await cloudinary.v2.uploader.destroy(postToUpdate.selectedFile.cloudId);
      }
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true },
    ).populate('creator', '-password');

    res.json(updatedPost);
  } catch (err) {
    console.log(err.message, err);
    res.status(500).json({ msg: 'Oops! Something went wrong, please try again!' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await PostMessage.findOne({
      creator: req.user.id,
      _id: req.params.id,
    });

    if (!post)
      return res.status(400).json({
        msg: 'No post found with this ID that belongs to the current user!',
      });

    if (post.selectedFile.cloudId !== -1) {
      await cloudinary.v2.uploader.destroy(post.selectedFile.cloudId);
    }

    await PostMessage.findByIdAndRemove(req.params.id);

    res.json({ message: 'Post deleted successfully!' });
  } catch (err) {
    console.log(err.message, err);
    res.status(500).json({ msg: 'Oops! Something went wrong, please try again!' });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;

    const post = await PostMessage.findById(id);

    if (!post) return res.status(404).json({ msg: 'Post not found D:' });

    let updatedPost;

    if (!post.likes.includes(currentUserId)) {
      updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1, likes: [...post.likes, currentUserId] },
        { new: true },
      ).populate('creator', '-password');
    } else {
      updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        {
          likeCount: post.likeCount - 1,
          likes: post.likes.filter(
            (user) => currentUserId.toString() !== user.toString(),
          ),
        },
        { new: true },
      ).populate('creator', '-password');
    }

    res.json(updatedPost);
  } catch (err) {
    console.log(err.message, err);
    res.status(500).json({ msg: 'Oops! Something went wrong, please try again!' });
  }
};
