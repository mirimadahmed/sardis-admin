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
          <div class="col-8">
            <button
              class="float-right btn btn-medium btn-primary"
              @click="fetch('agent')"
              v-if="type === 'customer'"
            >
              Show Agent FAQs <i class="fa fa-user"></i>
            </button>

            <button
              class="float-right btn btn-medium btn-primary"
              @click="fetch('customer')"
              v-if="type === 'agent'"
            >
              Show Customer FAQs <i class="fa fa-user"></i>
            </button>

            <button
              class="float-right btn btn-medium btn-primary mr-2"
              @click="addFAQ()"
            >
              Add FAQ <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <paper-table
            v-if="!isLoading"
            :data="table1.data"
            :columns="table1.columns"
            :actions="table1.actions"
            @edit="editFAQ"
            @delete="deleteFAQ"
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
const tableColumns = ["Question", "Answer"];
const tableData = [];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isLoading: false,
      type: "",
      table1: {
        title: "FAQs",
        subTitle: "System wide question answers",
        actions: ["edit", "delete"],
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  created() {
    this.fetch("customer");
  },
  methods: {
    addFAQ() {
      this.$router.push({ name: "add-faqs" });
    },
    async fetch(type) {
      this.isLoading = true;
      this.type = type;
      const { data } = await api.getFAQ(type);
      this.isLoading = false;
      this.table1.data = data;
    },
    editFAQ(faq) {
      this.$router.push(`/faq/${faq.id}`);
    },
    async deleteFAQ(faq) {
      this.isLoading = true;
      const { data } = await api.removeFAQ(faq.id);
      if (data.error === 0) {
        this.fetch(this.type);
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "FAQ deleted successfuly.",
          type: "success",
        });
      } else {
        this.error = data.message;
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: data.message,
          type: "danger",
        });
      }
      this.isLoading = false;
    },
  },
};
</script>
<style>
</style>
