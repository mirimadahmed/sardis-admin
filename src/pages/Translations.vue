<template>
  <div class="row">
    <div class="col-12">
      <card title="Update price">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">Languages</h4>
          </div>
        </div>

        <div slot="raw-content" class="py-3">
          <div v-if="!isLoading">
            <div class="row ml-1 px-3">
              <div class="col-6">
                <h4>English</h4>
              </div>
            </div>
            <div class="row ml-1 px-3">
              <div class="col-3">
                <button class="btn btn-primary btn-small" round outline block>
                  Upload
                </button>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-primary btn-small"
                  round
                  outline
                  block
                  @click="downloadEnglish()"
                >
                  Download
                </button>
              </div>
            </div>
            <div class="row ml-1 px-3">
              <div class="col-6">
                <h4>Turkish</h4>
              </div>
            </div>
            <div class="row ml-1 px-3">
              <div class="col-3">
                <button class="btn btn-primary btn-small" round outline block>
                  Upload
                </button>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-primary btn-small"
                  round
                  outline
                  block
                  @click="downloadTurkish()"
                >
                  Download
                </button>
              </div>
            </div>
            <div class="row ml-1 px-3 mt-5">
              <div class="col-3">
                <button class="btn btn-primary btn-small" round outline block>
                  Add Language
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
import Moralis from "moralis";
const appId = "7IRr1tK25jbvlEhI9qJgfpknkn2ykQIB1gRkNqX3";
const serverUrl = "https://vr2whj9yqakg.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

export default {
  data() {
    return {
      isLoading: false,
      translations: [],
    };
  },
  created() {
    this.isLoading = true;
    const Translation = Moralis.Object.extend("Translation");
    const query = new Moralis.Query(Translation);
    query.find().then((translations) => {
      this.translations = translations.map((translation) => {
        return {
          file: translation.get("file").url(),
          id: translation.id,
        };
      });
      this.isLoading = false;
    });
  },
  methods: {
    downloadItem(url) {
      window.open(url);
    },

    downloadEnglish() {
      this.downloadItem(this.translations[0].file);
    },
    downloadTurkish() {
      this.downloadItem(this.translations[1].file);
    },
  },
};
</script>
<style>
</style>
