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
const appId = "7IRr1tK25jbvlEhI9qJgfpknkn2ykQIB1gRkNqX3";
const serverUrl = "https://vr2whj9yqakg.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });
import { PaperTable } from "@/components";
const tableColumns = ["Type", "To", "From", "Amount"];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      table1: {
        title: "Transactions",
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
      const Transaction = Moralis.Object.extend("Transaction");
      const query = new Moralis.Query(Transaction);
      query.find().then((transactions) => {
        this.table1.data = transactions.map((transaction) => {
          return {
            type: transaction.get("type"),
            to: transaction.get("to"),
            from: transaction.get("from"),
            amount: transaction.get("amount"),
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
