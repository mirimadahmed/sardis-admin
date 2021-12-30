<template>
  <div class="row">
    <div class="col-md-12">
      <user-card :user="user"></user-card>
    </div>
    <div class="col-md-12">
      <card class="card-user">
        <div slot="raw-content" class="table-responsive">
          <div class="row">
            <div class="col-6">
              <h3 class="p-2 m-0">Transactions</h3>
            </div>
            <div class="col-6">
              <h3 class="p-2 m-0">Assets</h3>
            </div>
            <div class="col-6">
              <paper-table
                class="m-0"
                hover
                :data="transactions"
                :columns="['token', 'amount', 'transaction']"
              >
              </paper-table>
            </div>
            <div class="col-6">
              <paper-table
                class="m-0"
                hover
                :data="assets"
                :columns="['token', 'value']"
              >
              </paper-table>
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
const web3 = new Moralis.Web3();

import UserCard from "./UserProfile/UserCard.vue";
import { PaperTable } from "@/components";

export default {
  components: {
    UserCard,
    PaperTable,
  },
  data() {
    return {
      user: null,
      id: this.$route.params.id,
      message: "",
      isLoading: false,
      address: "",
      assets: [],
      transactions: [],
      tokenAddressSymbolMap: {
        "0x86523d83624b04cf4e62cbeb00c213bbc4486f34": "SRDS",
      },
    };
  },
  created() {
    this.fetch(this.id).then(() => {
      this.manageAvax();
      this.manageAvaxTransactions();
      this.manageTokens();
      this.manageTokenTransactions();
    });
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
    fetch(id) {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      return query.get(id).then((kyc) => {
        this.user = {
          name: kyc.get("name"),
          surname: kyc.get("surname"),
          nationality: kyc.get("nationality"),
          address: kyc.get("address"),
          nationalid: kyc.get("nid"),
          address1: kyc.get("address1"),
          address2: kyc.get("address2"),
          dob: kyc.get("dob"),
          city: kyc.get("city"),
          state: kyc.get("state"),
          zip: kyc.get("zip"),
          country: kyc.get("country"),
          image: kyc.get("id_file") ? kyc.get("id_file").url() : "",
          id: kyc.id,
        };
        this.address = kyc.get("wallet").toLowerCase();
        this.isLoading = false;
      });
    },
    async manageTokens() {
      this.isLoading = true;
      const query = new Moralis.Query("AvaxTokenBalance");
      query.equalTo("address", this.address);
      query.find().then((results) => {
        if (results.length > 0) {
          results.forEach((result) => {
            this.assets.push({
              value: web3.utils.fromWei(result.get("balance")),
              token: result.get("token_address"),
              name: result.get("symbol"),
              id: result.id,
            });
            if (result.get("symbol") === "SRDS") {
              this.balance = web3.utils.fromWei(result.get("balance"));
            }
          });
        }
        this.isLoading = false;
      });
    },
    async manageTokenTransactions() {
      const toQuery = new Moralis.Query("AvaxTokenTransfers");
      toQuery.equalTo("to_address", this.address);
      const fromQuery = new Moralis.Query("AvaxTokenTransfers");
      fromQuery.equalTo("from_address", this.address);
      const query = Moralis.Query.or(toQuery, fromQuery);
      query.find().then((transactions) => {
        transactions.forEach((transaction) => {
          this.transactions.push({
            status: transaction.get("confirmed"),
            id: transaction.id,
            type:
              transaction.get("to_address") === this.address
                ? "Received"
                : "Sent",
            token: this.getTokenSymbol(transaction.get("token_address")),
            amount:
              transaction.get("to_address") === this.address
                ? "+" + web3.utils.fromWei(transaction.get("value")).toString()
                : "-" + web3.utils.fromWei(transaction.get("value")).toString(),
            transaction: transaction.get("transaction_hash"),
          });
        });
      });
    },
    async manageAvax() {
      this.isLoading = true;
      const query = new Moralis.Query("WatchedAvaxAddress");
      query.equalTo("address", this.address);
      query.find().then((results) => {
        if (results.length > 0) {
          results.forEach((result) => {
            if (result.get("balance") && result.get("balance") !== "0") {
              this.assets.push({
                value: web3.utils.fromWei(result.get("balance")),
                token: "AVAX",
                name: "AVAX",
                id: result.id,
              });
            }
          });
        }
        this.isLoading = false;
      });
    },
    async manageAvaxTransactions() {
      const toQuery = new Moralis.Query("AvaxTransactions");
      toQuery.equalTo("to_address", this.address);
      const fromQuery = new Moralis.Query("AvaxTransactions");
      fromQuery.equalTo("from_address", this.address);
      const query = Moralis.Query.or(toQuery, fromQuery);
      query.find().then((transactions) => {
        transactions.forEach((transaction) => {
          if (transaction.get("value") !== "0")
            this.transactions.push({
              status: transaction.get("confirmed"),
              id: transaction.id,
              token: "AVAX",
              amount:
                transaction.get("to_address") === this.address
                  ? "+" +
                    web3.utils.fromWei(transaction.get("value")).toString()
                  : "-" +
                    web3.utils.fromWei(transaction.get("value")).toString(),
              transaction: transaction.get("hash"),
            });
        });
      });
    },
    getTokenSymbol(tokenAddress) {
      return this.tokenAddressSymbolMap[tokenAddress] || "";
    },
  },
};
</script>
<style>
</style>
