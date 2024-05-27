import request from './request';

export const signUp = (data) =>
  request({ url: '/api/users/sign_up', method: 'post', data });
export const getPosts = (data) =>
  request({ url: '/api/posts', method: 'get', params: data });
export const createPost = (data) =>
  request({ url: '/api/post', method: 'post', data });
