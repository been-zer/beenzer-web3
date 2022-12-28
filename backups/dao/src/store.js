import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    dark: true,
    sound: true,
  },
  getters: {

  },
  mutations: {
  },
  actions: {
    lightButton () {
      this.state.dark = !this.state.dark;
    },
    soundButton () {
      this.state.sound = !this.state.sound;
    }
  }
})