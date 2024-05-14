import request from './request';

export const getPosts = (data) =>
  request({ url: '/api/posts', method: 'get', params: data });
export const createPost = (data) =>
  request({ url: '/api/post', method: 'post', data });
