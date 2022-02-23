<template>
    <div class="container-fluid">

        <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">{{app_name}}</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <router-link to="/login" tag="button" class="btn btn-primary btn-lg px-4 gap-3" >Login</router-link>
        <router-link to="/register" tag="button" class="btn btn-success btn-lg px-4 gap-3" >Register</router-link>
      </div>
    </div>
  </div>

  <hr/>

  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">{{app_name}}</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>

    </div>
  </div>

    </div>    
</template>

<script>

export default {
  name: "Home",
  components: {
   // Resource,
  },
  data() {
    return {
      app_name: process.env.VUE_APP_WEB_APP_NAME,
      user: null,
      pk: null,
      sk: null,
      health: null,
    };
  },
  async beforeMount() {
      //this.app_name = 
    //this.user = await this.$userManager.userAttributes();
    //const URL = process.env.VUE_APP_API_URL;
    //const result = await fetch(URL+"/health").then(r => r.json());
    //this.health = result;
  },
};
</script>
