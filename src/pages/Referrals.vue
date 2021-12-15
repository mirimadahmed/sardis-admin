<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">{{ table1.title }}</h4>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <paper-table
            v-if="!isLoading"
            :data="table1.data"
            :columns="table1.columns"
            @active="activateUser"
            @suspended="suspendUser"
            :actions="table1.actions"
            @Paid="paidUser"
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
const appId = "7IRr1tK25jbvlEhI9qJgfpknkn2ykQIB1gRkNqX3";
const serverUrl = "https://vr2whj9yqakg.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

import { PaperTable } from "@/components";
const tableColumns = ["Username", "Wallet", "Amount"];
const tableData = [];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      type: "",
      status: "",
      table1: {
        title: "Referral Rewards",
        subTitle: "Rewards to pay to users for reffering others",
        actions: ["Paid"],
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const ReferralReward = Moralis.Object.extend("ReferralReward");
      const query = new Moralis.Query(ReferralReward);
      query.equalTo("paid", false);
      const rewards = await query.find();
      this.table1.data = [];
      for (let i = 0; i < rewards.length; i++) {
        const user = rewards[i].get("user");
        await user.fetch();
        this.table1.data.push({
          username: user.get("username"),
          wallet: user.get("wallet"),
          amount: rewards[i].get("amount"),
          id: rewards[i].id,
        });
      }
      this.isLoading = false;
    },
    async paidUser(user) {
      this.isLoading = true;
      const ReferralReward = Moralis.Object.extend("ReferralReward");
      const query = new Moralis.Query(ReferralReward);
      query.get(user.id).then(
        (reward) => {
          reward.set("paid", true);
          reward.save().then(() => {
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: "Maked as paid successfuly.",
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
  },
};
</script>
<style>
</style>
