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
            @View="viewUser"
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
const tableColumns = ["Full_Name", "Email", "Balance", "Location", "Phone", "Contact_Person"];
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
        title: "Agents",
        subTitle: "System wide withdrawal requests",
        actions: ["View"],
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
      const { data } = await api.getAgents();
      console.log(data);
      this.isLoading = false;
      this.table1.data = data;
    },
    viewUser(user) {
      this.$router.push('/agents/' + user.agent_id);
    },
    async activateUser(user, index) {
      this.isLoading = true;
      const { data } = await api.updateAgentStatus("active", user.agent_id);
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
      const { data } = await api.updateAgentStatus("suspended", user.agent_id);
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
  },
};
</script>
<style>
</style>
