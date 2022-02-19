<template>
  <div class="row mt-5" id="login-box">
    <div class="col-lg-4 col-md-5 col-sm-12">
      <div class="card">
        <div class="card-header">
          <div id="login-header">
            <img :src="logo" />
          </div>
        </div>

        <form
          method="post"
          action=""
          v-on:submit.prevent="login()"
          id="login-form"
        >
          <div class="card-body">
            <!-- FORM START -->
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12 mb-3">
                  <label for="">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    v-model="email"
                    aria-describedby="helpId"
                    autocomplete="username"
                    placeholder=""
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter your email</small
                  >
                </div>

                <div class="col-lg-12 mb-3">
                  <label for="">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    id="password"
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="password"
                    autocomplete="current-password"
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter your password</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit" @click="login()">
                Login
              </button>
            </div>
            <router-link to="register">Register</router-link>
          </div>
        </form>
      </div>
      <div class="alert alert-danger mt-3" v-if="error !== null" role="alert">
        {{ error }}
      </div>
    </div>
  </div>
  <Loading :loading="loading" message="Working..." />
</template>
<script>
import logo from "../assets/logo.png";
import Loading from "../components/Loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      logo,
      email: null,
      password: null,
      loading: true,
      error: null
    };
  },
  beforeMount() {
    this.loading = false;
  },
  methods: {
    async login() {
      this.loading = true;
      this.$userManager
        .login(this.email, this.password)
        .then((r) => {
          console.log({ response: r });
          this.$router.go({
            name: "Home",
            query: { message: "login success" },
          });
        })
        .catch((error) => {
          console.error({ error });
          this.error = error.message;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style>
html {
  font-size: 12px;
}
#login-box {
  display: grid;
  place-items: center;
}
#login-header {
  display: grid;
  place-items: center;
}
</style>
