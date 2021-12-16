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
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.username == "admin" && this.input.password == "pass") {
        this.$store.commit("setAuthentication", true);
        this.$router.replace({ name: "analytics" });
      } else {
        console.log("The username and / or password is incorrect");
      }
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