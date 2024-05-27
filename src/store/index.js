import { createStore } from 'vuex';
import router from '@/router';

const store = createStore({
  state() {
    return {
      isSignIn: JSON.parse(localStorage.getItem('login')) ? true : false,
      userInfo: JSON.parse(localStorage.getItem('user')),
    };
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_IS_LOG_IN(state, isSignIn) {
      state.isSignIn = isSignIn;
    },
  },
  actions: {
    setUserInfo({ commit }, data) {
      localStorage.setItem('user', JSON.stringify(data));
      commit('SET_USER_INFO', data);
    },
    setLogin({ commit, dispatch }, data) {
      localStorage.setItem('login', true);
      commit('SET_IS_LOG_IN', true);
      dispatch('setUserInfo', data);
    },
    setLogout({ commit, dispatch, state }) {
      localStorage.setItem('login', false);
      commit('SET_IS_LOG_IN', false);
      dispatch('setUserInfo', null);
      router.push('/login');
    },
  },
});

export default store;
