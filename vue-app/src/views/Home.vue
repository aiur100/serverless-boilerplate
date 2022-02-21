<template>
  <div class="row">
    <div class="col-lg">
      <div class="card mt-2 mb-2">
        <h2 class="card-title ms-3 mt-2">
          Home
          <small class="card-title m-3" style="color: grey; font-size: 16px;"
            >{{this.user?.name ? "Hello "+this.user.name+"!" : "Hello! Login or register"}}</small
          >
        </h2>

        <hr class="m-3" />

        <div class="card-body">
          {{ this.health }}
        </div>
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
      user: null,
      pk: null,
      sk: null,
      health: null,
    };
  },
  async beforeMount() {
    this.user = await this.$userManager.userAttributes();
    const URL = process.env.VUE_APP_API_URL;
    const result = await fetch(URL+"/health").then(r => r.json());
    this.health = result;
  },
};
</script>
