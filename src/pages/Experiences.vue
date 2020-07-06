<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">{{table1.title}}</h4>
            <p class="card-category" v-if="table1.subTitle">{{table1.subTitle}}</p>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <paper-table
            v-if="!isLoading"
            :data="table1.data"
            :columns="table1.columns"
            @active="activateListing"
            @suspended="suspendListing"
          ></paper-table>
          <div v-else class="w-100 text-center m-auto my-3 p-5">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-if="!isLoading" slot="footer" class="table-responsive">
          <nav class="w-25 m-auto">
            <ul class="pagination">
              <li
                class="page-item"
                :class="page === currentPage ? 'active' : ''"
                v-for="(page, i) in pages"
                :key="i"
              >
                <a class="page-link" :href="`/#/listings?page=${page}`">{{ page }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import api from "@/api";
const tableColumns = ["title", "description", "type", "departure_city", "destination_city", "start_date", "end_date", "num_seats", "is_featured", "status"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    type: "$36.738",
    rating: "Niger"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    type: "$23,789",
    rating: "Curaçao"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    type: "$56,142",
    rating: "Netherlands"
  },
  {
    id: 4,
    name: "Philip Chaney",
    type: "$38,735",
    rating: "Korea, South"
  },
  {
    id: 5,
    name: "Doris Greene",
    type: "$63,542",
    rating: "Malawi"
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      isLoading: false,
      perPage: 10,
      currentPage: this.$route.query.page
        ? parseInt(this.$route.query.page)
        : 1,
      rows: 24,
      table1: {
        title: "Experiences",
        subTitle: "All users created experiences",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  },
  created() {
    this.fetch(this.currentPage);
  },
  watch: {
    $route(val) {
      if (val.query.page && val.query.page !== this.currentPage) {
        this.currentPage = parseInt(val.query.page);
        this.fetch(this.currentPage);
      } else {
        this.currentPage = 1;
        this.fetch(this.currentPage);
      }
    }
  },
  computed: {
    pages() {
      let count = Math.ceil(this.rows / this.perPage);
      return [...Array(count).keys()].map(x => ++x);
    }
  },
  methods: {
    async fetch(page) {
      this.isLoading = true;
      const { data } = await api.experiences(page);
      this.isLoading = false;
      this.rows = data.count;
      this.table1.data = data.results;
    },
    async activateListing(user, index) {
      this.isLoading = true;
      const { data } = await api.activateListing(user.id)
      this.isLoading = false;
      if(data.error === 0) {
        this.table1.data[index].status = 'active';
        this.$notify({
          horizontalAlign: 'left',
          verticalAlign: 'bottom',
          message: 'Listing activated successfuly.',
          type: 'success'
        });
      } else {
        this.error = data.message
        this.$notify({
          horizontalAlign: 'left',
          verticalAlign: 'bottom',
          message: data.message,
          type: 'danger'
        });
        
      }
    },
    async suspendListing(user, index) {
      this.isLoading = true;
      const { data } = await api.suspendListing(user.id)
      this.isLoading = false;
      if(data.error === 0) {
        this.table1.data[index].status = 'suspended';
        this.$notify({
          horizontalAlign: 'left',
          verticalAlign: 'bottom',
          message: 'Listing suspended successfuly.',
          type: 'success'
        });
      } else {
        this.error = data.message
        this.$notify({
          horizontalAlign: 'left',
          verticalAlign: 'bottom',
          message: data.message,
          type: 'danger'
        });
        
      }
    }
  }
};
</script>
<style>
</style>
