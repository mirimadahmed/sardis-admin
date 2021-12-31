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
            @Review="reviewUser"
            @Approve="approveUser"
            @Disapprove="rejectUser"
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
const tableColumns = ["Name", "Surname", "Username"];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      table1: {
        title: "KYC",
        subTitle: "KYCs to check and approve/disapprove",
        columns: [...tableColumns],
        data: [],
        actions: ["Review", "Approve", "Disapprove"]
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
      query.equalTo("kyc", 0);
      query.find().then((kycs) => {
        this.table1.data = kycs.map((kyc) => {
          return {
            name: kyc.get("name"),
            surname: kyc.get("surname"),
            username: kyc.get("username"),
            nationalid: kyc.get("nid"),
            id: kyc.id,
          };
        });
      });
      this.isLoading = false;
    },
    async approveUser(user) {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.get(user.id).then(
        (us) => {
          us.set("kyc", 2);
          us.save().then(() => {
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: "KYC approved successfuly.",
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
    }, 
    async rejectUser(user) {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.get(user.id).then(
        (us) => {
          
          us.set("kyc", 1);
          us.save().then(() => {
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: "KYC rejected successfuly.",
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
    }, 
    async reviewUser(user) {
      this.$router.push("/kyc/" + user.id);
    }, 
  },
};
</script>
<style>
</style>
