<template>
  <div class="row">
    <div class="col-md-12">
      <user-card :user="user"></user-card>
    </div>
    <div class="col-md-12">
      <card class="card-user">
        <div class="row text-center p-5">
          <div class="col-md-4">
            <button @click="approve()" class="btn btn-small btn-success shadow">
              Approve KYC Request
            </button>
          </div>
          <div class="col-md-4">
            <fg-input
              class="shadow-sm"
              type="text"
              placeholder="KYC Rejection Comments:"
              v-model="message"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <button @click="reject()" class="btn btn-small btn-danger shadow">
              Reject KYC Application
            </button>
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

import UserCard from "./UserProfile/UserCard.vue";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      user: null,
      id: this.$route.params.id,
      message: ""
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
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.get(id).then((kyc) => {
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
      });
      this.isLoading = false;
    },
    async approve() {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.get(this.user.id).then(
        (us) => {
          us.set("kyc", 2);
          us.save().then(() => {
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: "KYC approved successfuly.",
              type: "success",
            });
            this.$router.push("/kycs");
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
    async reject() {
      this.isLoading = true;
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.get(this.user.id).then(
        (us) => {
          us.set("comments", this.message);
          us.set("kyc", 1);
          us.save().then(() => {
            this.$notify({
              horizontalAlign: "left",
              verticalAlign: "bottom",
              message: "KYC rejected successfuly.",
              type: "success",
            });
            this.$router.push("/kycs");
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
