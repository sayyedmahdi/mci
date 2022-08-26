import axios from "axios";

const state = {
  user: null, //JSON.parse(localStorage.getItem('user')),
  fighter: null,
  organizer: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  isAdmin: (state) => !!state.user && state.user.Type == 1,
  StateUser: (state) => state.user,
  Username: (state) => state.user ? state.user.Username : 'No User',
  UserType: function(state){
    if (state.user)
    {
      if (state.user.Type == 1)
        return 'Admin';
      if (state.user.Type == 2)
        return 'Enduser';
    }
    return 'Unknown';
  }
};

const actions = {
  async SetUser({commit}, user) {
    await commit("setUser", user);
  },
  async Logout({ commit }) {
    await commit("setUser", null);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};