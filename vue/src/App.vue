<template>
  <router-view></router-view>
</template>

<script>
import EventBus from "./bus/event-bus";

export default {
  mounted() {
    EventBus.$on("notification", function(payload) {
      console.log(payload);
      this.$toast.open({ message: payload.message, type: payload.type });
    });
  },
  beforeCreate() {}
};
</script>
