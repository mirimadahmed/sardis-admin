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
            <template v-for="translation in translations">
              <div class="row ml-1 px-3" :key="translation.id">
                <div class="col-6">
                  <h4>{{ translation.name }}</h4>
                </div>
              </div>
              <div class="row ml-1 px-3" :key="translation.id + 1">
                <div class="col-3">
                  <input
                    :id="translation.id"
                    @change="uploadFile(translation)"
                    type="file"
                    hidden
                    :ref="translation.id"
                  />
                  <button
                    @click="chooseFile(translation.id)"
                    class="btn btn-primary btn-small"
                    round
                    outline
                    block
                  >
                    Upload
                  </button>
                </div>
                <div class="col-3">
                  <button
                    class="btn btn-primary btn-small"
                    round
                    outline
                    block
                    @click="downloadItem(translation.file)"
                  >
                    Download
                  </button>
                </div>
              </div>
            </template>
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
const appId = "sB5QUUYtdPWRnifYozTfmnh5oPL5lXoEIDFpDjvw";
const serverUrl = "https://utvs1gompwym.usemoralis.com:2053/server";

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
          file: translation.get("messages").url(),
          name: translation.get("name"),
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
    chooseFile(componentId) {
      document.getElementById(componentId).click();
    },
    uploadFile(translation) {
      this.isLoading = true;
      translation.file = this.$refs[translation.id][0].files[0];
      const moralisFile = new Moralis.File(
        translation.id + Date.now().toString(),
        translation.file
      );
      moralisFile.save().then((retFile) => {
        const Translation = Moralis.Object.extend("Translation");
        const query = new Moralis.Query(Translation);
        query.get(translation.id).then((trns) => {
          trns.set("messages", retFile);
          trns.save().then(() => (this.isLoading = false));
          this.isLoading = false;
        });
      });
    },
  },
};
</script>
<style>
</style>
