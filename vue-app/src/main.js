import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import UserManage from "./UserManage";
import { createStore } from "vuex";
import * as module from "amazon-cognito-identity-js";
const UserManager = new UserManage(module, {
  UserPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
});

// Create a new store instance.
const store = createStore({
  state() {
    return {
      is_logged_in: false,
      user: {},
      is_loading: false,
    };
  },
  mutations: {
    isLoggedIn(state) {
      state.is_logged_in = true;
    },
    isNotLoggedIn(state) {
      state.is_logged_in = false;
      state.user = {};
    },
    setUserAttributes(state, attributes) {
      state.is_logged_in = true;
      Object.assign(state.user, attributes);
    },
    setUserManager(state, userManager) {
      state.user_manager = userManager;
    },
  },
  actions: {
    async login({ state, commit, dispatch }, payLoad) {
      const { email, password } = payLoad;
      await UserManager.login(email, password);
      await dispatch("setCurrentUser");
    },
    async logout({ state, commit, dispatch }) {
      await UserManager.logout();
      commit("isNotLoggedIn");
    },
    async setCurrentUser({ state, commit }) {
      await UserManager.userAttributes()
        .then((response) => {
          console.log("R", response);
          commit("isLoggedIn");
          commit("setUserAttributes", response);
        })
        .catch((error) => {
          console.error("SET USER ERROR:", error);
        });
    },
  },
});

// We are setting the current user, if there is one
store.dispatch({
  type: "setCurrentUser",
});

createApp(App).use(store).use(router).mount("#app");
