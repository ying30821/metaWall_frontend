import request from './request';

export const signIn = (data) =>
  request({ url: '/api/users/sign_in', method: 'post', data });
export const signUp = (data) =>
  request({ url: '/api/users/sign_up', method: 'post', data });
export const updatePassword = (data) =>
  request({
    url: '/api/users/update_password',
    method: 'patch',
    data,
  });
export const uploadImage = (data) =>
  request({
    url: '/api/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
export const getPosts = (data) =>
  request({ url: '/api/posts', method: 'get', params: data });
export const createPost = (data) =>
  request({ url: '/api/post', method: 'post', data });
export const createPostComment = (postId, data) =>
  request({
    url: `/api/post/${postId}/comment`,
    method: 'post',
    data,
  });
export const getProfile = (data) =>
  request({ url: '/api/users/profile', method: 'get', data });
export const editProfile = (data) =>
  request({ url: '/api/users/profile', method: 'patch', data });
