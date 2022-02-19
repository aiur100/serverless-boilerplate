<template>
      <!-- Nav bar -->
    <Nav />
  <!-- START - rendered views by routes here  -->
  <div class="container">

    
    <router-view />
    
  </div>
  <!-- END - rendered views by routes here  -->
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  components: {
    Nav,
  },
  computed: {
  },
  beforeMount(){
    //this.logged_in = this.$userManager.currentUser();
  },
  data(){
    return {
      route_name: this.$router.name,
      logged_in: false
    }
  }
};
</script>

<style></style>