<template>
  <div class="row mt-5" id="login-box">
    <div class="col-lg-4 col-md-5 col-sm-12">
    
      <div class="card" id="send-pass" v-if="show_code_entry === false">
        <div class="card-header">
          <div id="login-header">
            <h3>Reset Your Password</h3>
          </div>
        </div>

        <form
          method="post"
          action=""
          v-on:submit.prevent="sendCode()"
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

                
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit" >
                Send Verification Code
              </button>
            </div>
            <router-link to="register" class="m-2">Register</router-link>
            <router-link to="login" class="m-2">Login</router-link>
          </div>
        </form>
      </div>

      <div class="card" id="send-pass" v-if="show_code_entry === true">
        <div class="card-header">
          <div id="login-header">
            <h3>Enter verification Code</h3>
          </div>
        </div>

        <form
          method="post"
          action=""
          v-on:submit.prevent="resetPassword()"
          id="login-form"
        >
          <div class="card-body">
            <!-- FORM START -->
            <div class="card-body">
              <div class="row">

                <div class="col-lg-12 mb-3">
                  <label for="">Code Send to {{email}}</label>
                  <input
                    type="text"
                    class="form-control"
                    name="ver_code"
                    id="ver_code"
                    v-model="ver_code"
                    aria-describedby="ver_code"
                    autocomplete="ver_code"
                    placeholder=""
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter verification code sent to {{email}}</small
                  >
                </div>

                <div class="col-lg-12 mb-3">
                  <label for="">New Password</label>
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
              <button class="btn btn-primary" type="submit" >
                Reset Password
              </button>
            </div>
            <router-link to="register" class="m-2">Register</router-link>
            <router-link to="login" class="m-2">Login</router-link>
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
      error: null,
      show_code_entry: false,
      ver_code: null,
    };
  },
  beforeMount() {
    this.loading = false;
  },
  methods: {
    async sendCode() {
      this.loading = true;
      try{
        await this.$store.dispatch("sendPassResetCode",this.email).finally(() => (this.loading = false));
        this.show_code_entry = true;
        //this.$router.push({ path: '/', replace: true });
      }
      catch(error){
        this.error = error;
      }
    },
    async resetPassword(){
        this.loading = true;
      try{
        await this.$store.dispatch("resetPassword",{
            code: this.ver_code,
            email: this.email,
            newPassword: this.password
        }).finally(() => (this.loading = false));
         this.$router.push({ path: '/', replace: true });
      }
      catch(error){
        this.error = error;
      }
    }
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
