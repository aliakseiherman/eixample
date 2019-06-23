<template>
  <div style="max-width: 400px; margin-left: auto; margin-right: auto">
    <form>
      <md-card>
        <md-card-header data-background-color="blue">
          <h4 class="title">Login</h4>
          <p class="category">
            use
            <b>admin 123qwe</b> as default credentials
          </p>
        </md-card-header>
        <md-card-content>
          <div>
            <div>
              <md-field>
                <label>Username</label>
                <md-input v-model="username" type="text"></md-input>
              </md-field>
            </div>
            <div>
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
            </div>
            <div>
              <md-checkbox v-model="rememberMe" :value="true">Remember Me</md-checkbox>
            </div>
            <div>
              <md-button class="md-raised md-info" v-on:click="login">Login</md-button>
              <md-button class="md-raised">Register</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>
<style lang="scss"></style>
<script>
import http from "../helpers/axios-helper";

export default {
  components: {},
  methods: {
    login() {
      var self = this;

      http
        .post("Auth/Authenticate", {
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
