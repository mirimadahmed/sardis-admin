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
const appId = "LylHO2PCHeSnaB0wWqOaNGq3yeqPWNoeMw6nagJY";
const serverUrl = "https://vockdueuzxjr.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

import { PaperTable } from "@/components";
const tableColumns = ["Email", "Wallet", "Amount"];
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
      const web3 = new Moralis.Web3();
      for (let i = 0; i < rewards.length; i++) {
        const Wallet = Moralis.Object.extend("Wallet");
        const walletQuery = new Moralis.Query(Wallet);
        walletQuery.equalTo("email", rewards[i].get("user"));
        const wallets = await walletQuery.find();
        this.table1.data.push({
          email: rewards[i].get("user"),
          wallet: wallets[0] ? wallets[0].get("wallet") : "",
          amount: web3.utils.fromWei(rewards[i].get("amount").toString()),
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
