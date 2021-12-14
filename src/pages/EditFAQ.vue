<template>
  <div class="row">
    <div class="col-12">
      <card>
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">Edit FAQ</h4>
          </div>
        </div>

        <div slot="raw-content" class="table-responsive">
          <div v-if="!isLoading">
            <div class="row mt-2 ml-2 py-4">
              <div class="col-4">
                <p>Question</p>
                <textarea
                  class="shadow-sm col-12"
                  v-model="faq.question"
                ></textarea>
              </div>
              <div class="col-4">
                <p>Answer</p>
                <textarea
                  class="shadow-sm col-12"
                  v-model="faq.answer"
                ></textarea>
              </div>
              <div class="col-4 align-self-end mb-2">
                <button
                  @click="updateFAQ()"
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
import { PaperTable } from "@/components";
import api from "@/api";
import Card from '../components/Cards/Card.vue';

export default {
  components: {
    PaperTable,
    Card,
  },
  data() {
    return {
      isLoading: false,
      faq: null,
    };
  },
  created() {
    this.fetch(this.$route.params.id);
  },
  methods: {
    async fetch(id) {
      this.isLoading = true;
      const { data } = await api.getSingleFAQ(id);
      this.isLoading = false;
      this.faq = data;
    },
    async updateFAQ() {
      this.isLoading = true;
      const { data } = await api.updateFAQ(this.faq.user_type, this.faq.question, this.faq.answer, this.faq.id);
      this.isLoading = false;
      if (data.error === 0) {
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "FAQ Updated successfuly.",
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
    }
  },
};
</script>
<style>
</style>
