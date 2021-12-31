<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">{{ table1.title }}</h4>
            <p class="card-category" v-if="table1.subTitle">
              {{ table1.subTitle }}
            </p>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <paper-table
            v-if="!isLoading"
            :data="table1.data"
            :columns="table1.columns"
            :actions="table1.actions"
            @Delete="deleteUser"
            @View="viewUser"
          ></paper-table>
          <div v-else class="w-100 text-center m-auto my-3 p-5">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import Moralis from "moralis";
const appId = "sB5QUUYtdPWRnifYozTfmnh5oPL5lXoEIDFpDjvw";
const serverUrl = "https://utvs1gompwym.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });
import { PaperTable } from "@/components";
const tableColumns = ["username", "wallet", "amount"];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      table1: {
        title: "Users",
        subTitle: "All users",
        columns: [...tableColumns],
        data: [],
        actions: ["View", "Delete"],
      },
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
      query.notEqualTo("username", "admin");
      query.find().then((users) => {
        this.table1.data = users.map((user) => {
          return {
            username: user.get("username"),
            wallet: user.get("wallet"),
            amount: user.get("amount"),
            id: user.id,
          };
        });
      });
      this.isLoading = false;
    },
    async deleteUser(user) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.isLoading = true;
        const User = Moralis.Object.extend("User");
        const query = new Moralis.Query(User);
        query.get(user.id).then(
          (us) => {
            us.set("deleted", true);
            us.save().then(() => {
              this.$notify({
                horizontalAlign: "left",
                verticalAlign: "bottom",
                message: "Maked as deleted successfuly.",
                type: "success",
              });
              this.fetch();
            });
          },
          (error) => {
            this.isLoading = false;
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: error.message,
              type: "danger",
            });
          }
        );
      }
    },
    viewUser(user) {
      this.$router.push('/user/' + user.id);
    }
  },
};
</script>
<style>
</style>
