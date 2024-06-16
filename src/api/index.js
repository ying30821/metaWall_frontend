import request from './request';

// user
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
export const getProfile = (data) =>
  request({ url: '/api/users/profile', method: 'get', data });
export const editProfile = (data) =>
  request({ url: '/api/users/profile', method: 'patch', data });
export const getFollowings = (data) =>
  request({ url: '/api/users/followings', method: 'get', data });
export const followUser = (userId, data) =>
  request({ url: `/api/users/${userId}/follow`, method: 'post', data });
export const unfollowUser = (userId, data) =>
  request({ url: `/api/users/${userId}/follow`, method: 'delete', data });
export const getLikePosts = (data) =>
  request({ url: '/api/users/liked_posts', method: 'get', params: data });

// post
export const getPosts = (data) =>
  request({ url: '/api/posts', method: 'get', params: data });
export const getUserPosts = (userId, data) =>
  request({ url: `/api/posts/user/${userId}`, method: 'get', params: data });
export const getPost = (postId, data) =>
  request({ url: `/api/post/${postId}`, method: 'get', data });
export const createPost = (data) =>
  request({ url: '/api/post', method: 'post', data });
export const createPostComment = (postId, data) =>
  request({
    url: `/api/post/${postId}/comment`,
    method: 'post',
    data,
  });
export const deletePostComment = (commentId, data) =>
  request({
    url: `/api/post/comment/${commentId}`,
    method: 'delete',
    data,
  });
export const addPostLike = (postId, data) =>
  request({ url: `/api/post/${postId}/like`, method: 'post', data });
export const deletePostLike = (postId, data) =>
  request({ url: `/api/post/${postId}/like`, method: 'delete', data });

// upload
export const uploadImage = (data) =>
  request({
    url: '/api/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
