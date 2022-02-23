<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{app_name}}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :class="this?.page === 'Home' ? 'nav-link active' : 'nav-link'"
              to="/"
              >Home</router-link
            >
          </li>
        </ul>
        <form class="d-flex">
          <router-link to="/login" tag="button" class="btn btn-outline-success" v-if="!this.$store?.state?.user?.name">Login</router-link>
          <button class="btn btn-dark disabled me-2" v-if="this.$store?.state.is_logged_in">User: {{this.$store?.state?.user?.name}}</button>
          <button class="btn btn-outline-success" type="submit" @click.prevent="logOut()" v-if="this.$store?.state.is_logged_in">Log-Out</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      page: null,
      route: null,
      app_name: process.env.VUE_APP_WEB_APP_NAME
    };
  },
  watch: {
    "route.currentRoute": {
      handler: async function(data) {
        //const users = await this.$userManager.userAttributes();
        //console.log({ data: data?.name, users });
        this.page = data?.name;
      },
      deep: true,
      immediate: true,
    },
  },
  async beforeMount() {
   // this.user = await this.$userManager.userAttributes();
    this.route = this.$router;
    this.page = this.$router.currentRoute.value.name;
  },
  methods: {
    async logOut() {
     await this.$store.dispatch('logout');
     this.$router.push({ path: '/login', replace: true });
    },
    incrementButton(){
      this.$store.commit('increment');
    }
  },
};
</script>
