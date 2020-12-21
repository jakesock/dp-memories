import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = new PostMessage(req.body);
    post.creator = req.user;

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

export const updatePost = async (req, res) => {
  const postToUpdate = await PostMessage.findOne({
    creator: req.user,
    _id: req.params.id,
  });

  if (!postToUpdate)
    return res
      .status(400)
      .json({ msg: 'No post found with this ID that belongs to the current user!' });

  const { id: _id } = req.params;
  const post = req.body;

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true },
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const post = await PostMessage.findOne({ creator: req.user, _id: req.params.id });

  if (!post)
    return res
      .status(400)
      .json({ msg: 'No post found with this ID that belongs to the current user!' });

  await PostMessage.findByIdAndRemove(req.params.id);

  res.json({ message: 'Post deleted successfully!' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const post = await PostMessage.findById(id);

  if (!post) return res.status(404).json({ msg: 'Post not found D:' });

  let updatedPost;

  if (!post.likes.includes(user)) {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1, likes: [...post.likes, user] },
      { new: true },
    );
  } else {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount - 1,
        likes: post.likes.filter((user) => user !== user),
      },
      { new: true },
    );
  }

  res.json(updatedPost);
};
