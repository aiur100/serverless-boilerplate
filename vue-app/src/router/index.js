import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import Register from "/src/views/Register.vue";
import Login from "/src/views/Login.vue";
import Hero from "/src/views/Hero.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Hero
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
        requiresLogin: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    console.log("Router");
  if (
    to.matched.some((record) => record.meta.requiresLogin) &&
    !router.store.state.auth.is_logged_in
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
