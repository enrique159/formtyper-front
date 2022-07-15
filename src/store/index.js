import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ],
  state: {
    token: null,
    user: {},
    rememberSesion: false,
  },
  getters: {
    getToken: state => state.token,
    getRememberSesion: state => state.rememberSesion,
    getUser: state => state.user,
  },
  mutations: {
    // UNIVERSAL MUTATION
    SET_STATE_VALUE( state, payload ) {
      for( let key in payload ){
        if( !payload.hasOwnProperty( key ) ) continue;
        state[key] = payload[key];
      }
    },
  },
  actions: {
    setToken: ({ commit }, { token }) => {
      commit('SET_STATE_VALUE', { token: token });
    },
    setUser: ({ commit }, { user }) => {
      commit('SET_STATE_VALUE', { user: user });
    },
    setRememberSesion: ({ commit }, { rememberSesion }) => {
      commit('SET_STATE_VALUE', { rememberSesion: rememberSesion });
    },
  },
  modules: {
  }
})
