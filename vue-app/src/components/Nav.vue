<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Workload</a>
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
    };
  },
  watch: {
    "route.currentRoute": {
      handler: function(data) {
        console.log({ data: data?.name });
        this.page = data?.name;
      },
      deep: true,
      immediate: true,
    },
  },
  async beforeMount() {
    //test
  },
  methods: {
    async logOut() {
     // await this.$userManager.logout();
     // this.$router.go({ name: "Login", query: { message: "log out success" } });
    },
  },
};
</script>
