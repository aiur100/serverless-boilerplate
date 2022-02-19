<template>
  <div :class="loading ? 'overlay' : 'overlay d-none'" id="loadingOverlay">
    <div class="overlay-content">
      <div
        class="spinner-border"
        style="width: 5rem; height: 5rem;"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
      <h4 class="mt-3">{{message}}</h4>
    </div>
  </div>
</template>
<script>
export default {
  props: {
      loading: {
          type: Boolean,
          default: true
      },
      message: {
          type: String,
          default: 'Slaying Dragons....'
      }
  },
  beforeMount(){
      console.log({loading: this.loading});
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
.overlay {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.80);
  background-color: rgba(255, 255, 255, 0.80);
  overflow-x: hidden;
  transition: 0.8s;
}

.overlay-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>
