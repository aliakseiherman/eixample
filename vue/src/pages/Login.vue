<template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">Login</h4>
        <p class="category">
          use
          <b>admin 123qwe</b> as default credentials
        </p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Username</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-left">
            <md-checkbox v-model="rememberMe" :value="true">Remember Me</md-checkbox>
          </div>
          <div class="md-layout-item md-size-100 text-left">
            <md-button class="md-raised md-success" v-on:click="login">Login</md-button>
            <md-button class="md-raised" v-on:click="login">Register</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<style lang="scss"></style>
<script>
const axios = require("axios");

export default {
  components: {},
  methods: {
    login() {
      axios
        .post("http://localhost:8080/api/Auth/Authenticate", {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe
        })
        .then(function(result) {
          if (result.data.token) {
            localStorage.setItem("token", result.data.token);
            window.location = "/";
          }
        });
    }
  },
  data: function() {
    return {
      username: "",
      password: "",
      rememberMe: true
    };
  }
};
</script>
