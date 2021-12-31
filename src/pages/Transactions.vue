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
const tableColumns = ["To", "From", "Amount", "Confirmed"];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      table1: {
        title: "Sardis Transactions",
        subTitle: "All transactions",
        columns: [...tableColumns],
        data: [],
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const Transaction = Moralis.Object.extend("AvaxTokenTransfers");
      const query = new Moralis.Query(Transaction);
      query.equalTo("token_address", "0x86523d83624b04cf4e62cbeb00c213bbc4486f34");
      query.find().then((transactions) => {
        this.table1.data = transactions.map((transaction) => {
          return {
            to: transaction.get("to_address"),
            from: transaction.get("from_address"),
            amount: transaction.get("value"),
            confirmed: transaction.get("confirmed") ? "Yes" : "No",
          };
        });
      });
      this.isLoading = false;
    },
  },
};
</script>
<style>
</style>
