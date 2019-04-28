<template>
  <router-view></router-view>
</template>

<script>
export default {
  beforeCreate() {
    this.$http.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        this.$toast.open({ message: err.response.data.error, type: "error" });
        // Unauthorised, log out
        if (err.response && err.response.status === 401) {
          // this.logout();
        }
        return Promise.reject(err);
      }
    );
  }
};
</script>
