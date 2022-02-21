<template>
  <div class="row mt-5" id="login-box">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <div class="card">
        <div class="card-header">
          <div id="login-header">
            <img :src="logo" />
          </div>
        </div>
        <div class="card-body">
          <!-- FORM START -->
          <form method="post" action="" id="login-form">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12 mb-3">
                  <label for="">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    id="email"
                    v-model="email"
                    aria-describedby="helpId"
                    autocomplete="email"
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

                <div class="col-lg-12 mb-3">
                  <label for="">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    v-model="name"
                    aria-describedby="helpId"
                    autocomplete="name"
                    placeholder=""
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter name</small
                  >
                </div>

                <div class="col-lg-12 mb-3">
                  <label for="">Group Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="group_name"
                    id="group_name"
                    v-model="custom_group_name"
                    aria-describedby="helpId"
                    autocomplete="username"
                    placeholder=""
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter group name</small
                  >
                </div>

                <div class="col-lg-12 mb-3">
                  <label for="">Group Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    name="group_description"
                    id="group_description"
                    v-model="group_description"
                    aria-describedby="helpId"
                    autocomplete="username"
                    placeholder=""
                  ></textarea>
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter group description</small
                  >
                </div>

                <div class="col-lg-12 mb-3">
                  <label for="">Phone Number</label>
                  <input
                    type="phone"
                    class="form-control"
                    name="phone_number"
                    id="phone_number"
                    v-model="phone_number"
                    aria-describedby="helpId"
                    autocomplete="username"
                    placeholder=""
                  />
                  <small id="helpId" class="form-text text-muted d-none"
                    >Enter Phone number</small
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-grid gap-2">
            <button
              class="btn btn-primary"
              type="submit"
              @click.prevent="register()"
            >
              Register
            </button>
            <router-link to="login">Login</router-link>
          </div>
        </div>
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
      loading: false,
      email: null,
      password: null,
      name: null,
      phone_number: null,
      message: null,
      custom_group_name: null,
      group_description: null,
      error: null,
    };
  },
  beforeMount() {
    console.group("USER REGISTRATION");
  },
  mounted() {
    console.log("Page created successfully");
  },
  methods: {
    register() {
      this.$userManager
        .register({
          email: this.email,
          userNameFieldName: "email",
          password: this.password,
          name: this.name,
          //phone_number: this.cleanPhoneNumber(this.phone_number),
          //"custom:group_name": this.custom_group_name,
          //"custom:user_type": "employer",
          //"custom:group_descrip": this.group_description,
        })
        .then((response) => {
          console.log({ response });
          this.$router.push({
            name: "Login",
            query: { message: "login success" },
          });
        })
        .catch((error) => {
          console.error(error);
          console.trace(error);
          this.error = error.message;
        });
    },
    cleanPhoneNumber(phoneNumber) {
      let justNumbers = phoneNumber.match(/\d+/g).join("");
      if (justNumbers.length > 10) {
        return "+" + justNumbers;
      } else {
        return "+1" + justNumbers;
      }
    },
  },
};
</script>
<style>
#login-box {
  display: grid;
  place-items: center;
}
#login-header {
  display: grid;
  place-items: center;
}
</style>
