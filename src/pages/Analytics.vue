<template>
  <div>
    <div v-if="isLoading" class="w-100 text-center m-auto my-3 p-5">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12">
          <p>Terms</p>
        </div>
        <div class="col-12">
          <VueEditor id="editor1" v-model="terms" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <p>Privacy Policy</p>
        </div>
        <div class="col-12">
          <VueEditor id="editor2" v-model="privacy" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <button class="btn btn-primary" @click="save()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
("@/components/index");
import api from "@/api";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      isLoading: false,
      terms: null,
      privacy: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await api.getContent();
      this.isLoading = false;
      this.terms = data.terms;
      this.privacy = data.privacy;
    },
    async save() {
      this.isLoading = true;
      const { data } = await api.updatedStatic(this.terms, this.privacy);
      this.isLoading = false;
      if (data.error === 0) {
        this.$notify({
          horizontalAlign: "left",
          verticalAlign: "bottom",
          message: "Static Content Saved Successfully.",
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
