"use strict";
/**
 * 
 * Cognito Authorization State Management
 * --------------------------
 * 
 * Login and out with this Vuex State Manager
 * 
 * 
 */
import UserManage from "../UserManage";
import * as module from "amazon-cognito-identity-js";
const UserManager = new UserManage(module, {
  UserPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
});

const auth = {
  state: () => {
    return {
      user: null,
      is_logged_in: false,
      is_loading: false,
    };
  },
  mutations: {
    isLoggedIn(state) {
      console.log("is Logged IN",true);
      state.is_logged_in = true;
    },
    isNotLoggedIn(state) {
      state.is_logged_in = false;
    },
    clearUser(state){
      state.user = null;
    },
    setUserAttributes(state, attributes) {
      console.log("sUserAttributes",attributes);
      state.is_logged_in = true;
      state.user = attributes;
    },
  },
  actions: {
    async login({ dispatch }, payLoad) {
      const { email, password } = payLoad;
      await UserManager.login(email, password);
      await dispatch("setCurrentUser");
    },
    async register({ commit },payLoad){
        const { email, password, name } = payLoad;
        await UserManager.register({
            email,
            userNameFieldName: "email",
            password,
            name,
            //phone_number: this.cleanPhoneNumber(this.phone_number),
            //"custom:group_name": this.custom_group_name,
            //"custom:user_type": "employer",
            //"custom:group_descrip": this.group_description,
          });
    },
    async logout({ commit }) {
      await UserManager.logout();
      commit("isNotLoggedIn");
      commit("clearUser");
    },
    async sendPassResetCode({ commit },email){
      await UserManager.sendPassResetCode(email);
    },
    async resetPassword({ commit }, { code, email, newPassword }){
      await UserManager.resetPassword(code,email,newPassword);
    },
    async setCurrentUser({ commit }) {
      await UserManager.userAttributes()
        .then((response) => {
          commit("isLoggedIn");
          commit("setUserAttributes", response);
        })
        .catch((error) => {
          console.error("SET USER ERROR:", error);
        });
    },
  }
};

export { auth };