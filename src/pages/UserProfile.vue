<template>
  <div class="row">
    <div class="col-md-12">
      <user-card :user="user" @changeStatus="changeStatus"></user-card>
    </div>
  </div>
</template>
<script>
import UserCard from "./UserProfile/UserCard.vue";
import api from "@/api";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      user: null,
      id: this.$route.params.id,
    };
  },
  created() {
    this.fetch(this.id);
  },
  watch: {
    $route(val) {
      if (val.params.id && val.params.id !== this.id) {
        this.id = parseInt(val.params.id);
        this.fetch(this.id);
      } else {
        this.fetch(this.id);
      }
    },
  },
  methods: {
    async fetch(id) {
      this.isLoading = true;
      const { data } = await api.getAgent(id);
      this.isLoading = false;
      this.user = data;
    },
    async changeStatus(status, user) {
      this.isLoading = true;
      const { data } = await api.updateAgentStatus(status, user.agent_id);
      this.isLoading = false;
      if (data.error === 0) {
        this.fetch(this.id);
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "User status update successfuly.",
          type: "success",
        });
      } else {
        this.error = data.message;
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: data.message,
          type: "danger",
        });
      }
    },
  },
};
</script>
<style>
</style>
