<template>
  <div>
    <h1>Login</h1>
    <div class="row p-5">
      <div class="col-4 offset-4">
        <input
          type="text"
          name="username"
          v-model="input.username"
          placeholder="Username"
          class="form-control shadow"
        />
        <input
          type="password"
          name="password"
          v-model="input.password"
          placeholder="Password"
          class="form-control mt-2 shadow"
        />
        <button class="btn btn-primary btn-small mt-2 shadow" @click="login()">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Moralis from "moralis";
const appId = "LylHO2PCHeSnaB0wWqOaNGq3yeqPWNoeMw6nagJY";
const serverUrl = "https://vockdueuzxjr.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "admin",
        password: "$d6~&p4xM}WCP'M=",
      },
    };
  },
  methods: {
    login() {
      Moralis.User.logIn(this.input.username, this.input.password, { usePost: true }).then((user) => {
        if (user.get("username") === "admin") {
          this.$store.commit("setAuthentication", true);
          this.$router.replace({ name: "analytics" });
        }
      });
    },
  },
};
</script>

<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>