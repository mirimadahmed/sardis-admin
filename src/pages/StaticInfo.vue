<template>
  <div class="row">
    <div class="col-12">
      <card title="Update price">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">App Banner Message</h4>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <div v-if="!isLoading">
            <div class="row mt-3 ml-1">
              <div class="col-10">
                <fg-input
                  class="shadow-sm"
                  type="text"
                  placeholder="App Banner Message"
                  v-model="message"
                ></fg-input>
              </div>
              <div class="col-2">
                <button
                  @click="update()"
                  class="btn btn-small btn-primary shadow"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
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
import Moralis from "moralis"
const appId = "LylHO2PCHeSnaB0wWqOaNGq3yeqPWNoeMw6nagJY";
const serverUrl = "https://vockdueuzxjr.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });


export default {
  data() {
    return {
      isLoading: false,
      message: "",
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.isLoading = true;
      const StaticInfo = Moralis.Object.extend("StaticInfo");
      const query = new Moralis.Query(StaticInfo);
      query.find().then(
        (info) => {
          this.info = info[0];
          this.message = this.info.get("info");
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          // The object was not retrieved successfully.
          // error is a Moralis.Error with an error code and message.
        }
      );
    },
    async update() {
      this.isLoading = true;
      
      this.info.set("info", this.message);
      this.info.save().then((info) => {
        this.isLoading = false;
        
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "Message updated successfuly.",
          type: "success",
        });
      }).catch((error) => {
        this.isLoading = false;
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: error.message,
          type: "danger",
        });
      });
    },
  },
};
</script>
<style>
</style>
