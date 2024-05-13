import request from './request';

export const getPosts = (data) =>
  request({ url: '/api/posts', method: 'get', params: data });
