<template>
  <div class="row">
    <div class="col-lg">
      <div class="card mt-2 mb-2">
        <h2 class="card-title ms-3 mt-2">
          Home
          <small class="card-title m-3" style="color: grey; font-size: 16px;"
            >Welcome User</small
          >
        </h2>

        <hr class="m-3" />

        <div class="card-body">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Resource from "../components/Resource.vue";

export default {
  name: "Home",
  components: {
   // Resource,
  },
  data() {
    return {
      user: null,
      pk: null,
      sk: null
    };
  },
  async beforeMount() {
    // here
  },
};
</script>
