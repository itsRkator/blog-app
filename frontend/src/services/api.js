import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your FastAPI server URL
const API_BASE_URL = 'https://blog-sqf4.onrender.com/api'; // Replace with your FastAPI server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const createPost = (post) => {
  return api.post("/posts/", post);
};

const getPosts = () => {
  return api.get("/posts/");
};

const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

const updatePost = (id, post) => {
  return api.put(`/posts/${id}`, post);
};

const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export { createPost, getPosts, getPost, updatePost, deletePost };
