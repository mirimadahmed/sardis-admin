<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">{{ table1.title }}</h4>
            <p class="card-category pt-2">
              {{ type }} {{ status }} requests
            </p>
          </div>
          <div class="col-8">
            <button
              class="float-right btn btn-sm btn-primary m-2"
              @click="fetch('customer', 'completed')"
            >
              Show Completed Customer Requests
            </button>

            <button
              class="float-right btn btn-sm btn-primary m-2"
              @click="fetch('customer', 'cancelled')"
            >
              Show Cancelled Customer Requests
            </button>
            
            <button
              class="float-right btn btn-sm btn-primary m-2"
              @click="fetch('customer', 'pending')"
            >
              Show pending Customer Requests
            </button>

            <button
              class="float-right btn btn-sm btn-secondary m-2"
              @click="fetch('agent', 'completed')"
            >
              Show Completed Agent Requests
            </button>

            <button
              class="float-right btn btn-sm btn-secondary m-2"
              @click="fetch('agent', 'cancelled')"
            >
              Show Cancelled Agent Requests
            </button>
            
            <button
              class="float-right btn btn-sm btn-secondary m-2"
              @click="fetch('agent', 'pending')"
            >
              Show pending Agent Requests
            </button>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <paper-table
            v-if="!isLoading"
            :data="table1.data"
            :columns="table1.columns"
            :actions="table1.actions"
            @active="activateUser"
            @suspended="suspendUser"
            @completed="completeRequest"
            @cancelled="cancelRequest"
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
const tableColumns = ["Full_Name", "Email", "Amount", "Balance", "Status"];
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
        title: "Withdrawal Requests",
        subTitle: "System wide withdrawal requests",
        actions: ["completed", "cancelled"],
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  created() {
    this.fetch("customer", "pending");
  },
  methods: {
    async fetch(type, status) {
      this.isLoading = true;
      this.type = type;
      this.status = status;
      const { data } = await api.withdrawRequest(type, status);
      console.log(data);
      this.isLoading = false;
      this.table1.data = data;
    },
    async activateUser(user, index) {
      this.isLoading = true;
      const { data } = await api.activate(user.id);
      this.isLoading = false;
      if (data.error === 0) {
        this.table1.data[index].status = "active";
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "User activated successfuly.",
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
    },
    async suspendUser(user, index) {
      this.isLoading = true;
      const { data } = await api.suspend(user.id);
      this.isLoading = false;
      if (data.error === 0) {
        this.table1.data[index].status = "suspended";
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "User suspended successfuly.",
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
    },
    async completeRequest(request) {
      this.isLoading = true;
      const { data } = await api.updateWithdrawalStatus("completed", request.id);
      this.isLoading = false;
      if (data.error === 0) {
        this.fetch(this.type, this.status);
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "Request completed successfuly.",
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
    },
    async cancelRequest(request) {
      this.isLoading = true;
      const { data } = await api.updateWithdrawalStatus("cancelled", request.id);
      this.isLoading = false;
      if (data.error === 0) {
        this.fetch(this.type, this.status);
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "Request cancelled successfuly.",
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
    },
  },
};
</script>
<style>
</style>
