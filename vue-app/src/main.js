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

const app = createApp(App);
store.dispatch({
  type: "setCurrentUser",
})
.finally(()=>{
  router.store = store;
  app.use(store).use(router).mount("#app");
});