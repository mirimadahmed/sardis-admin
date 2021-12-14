<template>
  <div class="row">
    <div class="col-12">
      <card title="Update price">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">Update Price</h4>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <div v-if="!isLoading">
            <div class="row mt-2 ml-2">
              <div class="col-4">
                <fg-input
                class="shadow-sm"
                  type="number"
                  placeholder="Price"
                  v-model="price"
                ></fg-input>
              </div>
              <div class="col-4">
                <button
                  @click="updatePrice()"
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
import { PaperTable } from "@/components";
import api from "@/api";
const tableColumns = ["Price", "Dated"];
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
      price: 0,
      table1: {
        title: "UCO Pricing",
        subTitle: "System wide uco pricing",
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
      const { data } = await api.getUCOPrices();
      this.isLoading = false;
      this.price = data[0].price;
      this.table1.data = data.slice(1);
    },
    async updatePrice() {
      this.isLoading = true;
      const { data } = await api.setUCOPrices(this.price);
      this.isLoading = false;
      if (data.error === 0) {
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "Price updated successfuly.",
          type: "success",
        });
        this.fetch()
      } else {
        this.error = data.message;
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: data.message,
          type: "danger",
        });
      }
    },
  },
};
</script>
<style>
</style>
