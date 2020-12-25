import axios from 'axios';

const postsUrl = 'http://localhost:8080/posts';

// PostMessage Routes
export const fetchPosts = () => axios.get(postsUrl);
export const createPost = (newPost, config) => axios.post(postsUrl, newPost, config);
export const updatePost = (id, updatedPost, config) =>
  axios.patch(`${postsUrl}/${id}`, updatedPost, config);
export const deletePost = (id, config) => axios.delete(`${postsUrl}/${id}`, config);
export const likePost = (id, config) =>
  axios.patch(`${postsUrl}/${id}/likePost`, null, config);

// User Routes
