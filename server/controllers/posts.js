import PostMessage from '../models/postMessage.js';
import cloudinary from '../utils/cloudinary.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
      .populate('creator', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, message, tags, selectedFile } = req.body;

    if (!title || !message)
      return res.status(400).json({ msg: 'Title and message cannot be empty!' });

    const imageRes = await cloudinary.v2.uploader.upload(selectedFile, {
      upload_preset: 'dp_memories',
    });

    const post = new PostMessage({
      title,
      message,
      tags,
      selectedFile: {
        cloudId: imageRes.public_id,
        url: imageRes.url,
      },
    });
    post.creator = req.user.id;

    const savedPost = await post.save();

    const response = await PostMessage.populate(savedPost, {
      path: 'creator',
      model: 'User',
      select: '-password',
    });

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
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

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true },
    ).populate('creator', '-password');

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    await PostMessage.findByIdAndRemove(req.params.id);
    await cloudinary.v2.uploader.destroy(post.selectedFile.cloudId);

    res.json({ message: 'Post deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};
