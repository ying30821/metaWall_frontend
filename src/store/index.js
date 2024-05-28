import { createStore } from 'vuex';
import router from '@/router';
import { getProfile } from '@/api';

const store = createStore({
  state() {
    return {
      isSignIn: JSON.parse(localStorage.getItem('login')) ? true : false,
      token: JSON.parse(localStorage.getItem('token')),
      userInfo: null,
    };
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_IS_LOG_IN(state, isSignIn) {
      state.isSignIn = isSignIn;
    },
  },
  actions: {
    setToken({ commit }, data) {
      localStorage.setItem('token', JSON.stringify(data));
      commit('SET_TOKEN', data);
    },
    async setUserInfo({ commit }) {
      const res = await getProfile();
      commit('SET_USER_INFO', res.data.user);
    },
    setLogin({ commit, dispatch }, token) {
      localStorage.setItem('login', true);
      commit('SET_IS_LOG_IN', true);
      dispatch('setToken', token);
    },
    setLogout({ commit, dispatch, state }) {
      localStorage.setItem('login', false);
      commit('SET_IS_LOG_IN', false);
      commit('SET_USER_INFO', null);
      dispatch('setToken', null);
      router.push('/login');
    },
  },
});

export default store;
