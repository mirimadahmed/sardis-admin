<template>
  <div>
    <div v-if="isLoading" class="w-100 text-center m-auto my-3 p-5">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-4">
          <stats-card
          >
            <div
              class="icon-big text-center"
              slot="header"
            >
              <i class="ti-user"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Total Users</p>
              {{ totalUsers }}
            </div>
            <div class="stats" slot="footer">
              Total active users in Sardis
            </div>
          </stats-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatsCard from "../components/Cards/StatsCard.vue";
import Moralis from "moralis";
const appId = "sB5QUUYtdPWRnifYozTfmnh5oPL5lXoEIDFpDjvw";
const serverUrl = "https://utvs1gompwym.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });
export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      isLoading: false,
      totalUsers: 0,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.equalTo("deleted", false);
      query.find().then((users) => {
        this.totalUsers = users.length;
      });
      this.isLoading = false;
    },
  },
};
</script>
<style>
</style>
