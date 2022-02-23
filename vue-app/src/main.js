import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { auth } from "./store/auth";
import { createStore } from "vuex";


const store = createStore({
  modules: {
    auth,
  },
});

// We are setting the current user, if there is one
store.dispatch({
  type: "setCurrentUser",
});

createApp(App).use(store).use(router).mount("#app");
