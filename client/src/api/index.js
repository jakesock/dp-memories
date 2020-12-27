import axios from 'axios';

// PostMessage Routes
export const fetchPosts = () => axios.get('/posts');
export const createPost = (newPost, config) => axios.post('/posts', newPost, config);
export const updatePost = (id, updatedPost, config) =>
  axios.patch(`/posts/${id}`, updatedPost, config);
export const deletePost = (id, config) => axios.delete(`/posts/${id}`, config);
export const likePost = (id, config) =>
  axios.patch(`/posts/${id}/likePost`, null, config);

// User Routes
export const registerUser = (newUser, config) =>
  axios.post('/users/register', newUser, config);
export const loginUser = (user, config) => axios.post('/users/login', user, config);
export const getUserData = (config) => axios.get('/users', config);
