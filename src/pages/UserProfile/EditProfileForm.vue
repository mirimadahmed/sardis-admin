<template>
  <card class="card" title="Create a new target">
    <div>
      <form @submit.prevent v-if="!isLoading">
        <div class="row" v-if="error.length > 0">
          <div class="col-md-12">
            <div class="form-group">
              <label class="control-label">Error</label>
              <p>{{ error }}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text" label="Target name" placeholder="Name" v-model="target.name"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="control-label">Target type</label>
              <select v-model="target.type" class="form-control">
                <option v-for="(type, i) in types" :key="i" :value="type">{{ type }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="control-label">Target Image</label>
              <input class="form-control" type="file" @change="onTargetPicked" />
            </div>
          </div>
        </div>

        <div class="row" v-if="target.type === 'Model'">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">IOS Asset Bundle</label>
              <input class="form-control" type="file" @change="onIOSPicked" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Android Asset Bundle</label>
              <input class="form-control" type="file" @change="onAndroidPicked" />
            </div>
          </div>
        </div>

        <div class="row" v-if="target.type === 'Video'">
          <div class="col-md-12">
            <div class="form-group">
              <label class="control-label">AR Layer Video</label>
              <input class="form-control" type="file" @change="onVideoFilePicked" />
            </div>
          </div>
        </div>

        <div class="row" v-if="target.type === 'Audio'">
          <div class="col-md-12">
            <div class="form-group">
              <div class="form-group">
                <label class="control-label">AR Layer Audio</label>
                <input class="form-control" type="file" @change="onAudioFilePicked" />
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="target.type === 'Link'">
          <div class="col-md-12">
            <fg-input type="url" label="URL" placeholder="Link" v-model="target.url"></fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info" round @click.native.prevent="addTarget">Add Target</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
      <div v-else class="w-100 text-center m-auto my-3 p-5">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
      </div>
    </div>
  </card>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      isLoading: false,
      error: "",
      types: ["Link", "Video", "Audio", "Model"],
      target: {
        name: "",
        image: null,
        type: null,
        ios: null,
        android: null,
        url: "",
        video: null,
        audio: null,
        rating: 2
      }
    };
  },
  methods: {
    async addTarget() {
      if(this.target.name.length < 5) {
        this.notify('danger', 'Name must be more than 5 characters')
        return;
      }
      if(this.target.type === null) {
        this.notify('danger', 'Select type')
        return;
      }
      if(this.target.image === null) {
        this.notify('danger', 'Select target image')
        return;
      }
      switch (this.target.type) {
        case "Audio":
          if(this.target.audio === null) {
            this.notify('danger', 'Select the audio file')
            return;
          }
          break;
        case "Video":
          if(this.target.video === null) {
            this.notify('danger', 'Select the video file')
            return;
          }
          break;
        case "Model":
          if(this.target.android === null) {
            this.notify('danger', 'Select android asset bundle')
            return;
          }
          if(this.target.ios === null) {
            this.notify('danger', 'Select iOS asset bundle')
            return;
          }
          break;
        case "Link":
          if(this.target.url.length === 0) {
            this.notify('danger', 'Add link first')
            return;
          }
          break;
      }
      this.isLoading = true;
      let target = new FormData();
      target.append("type", this.target.type);
      target.append("name", this.target.name);
      target.append("rating", this.target.rating);
      target.append("video", this.target.video);
      target.append("url", this.target.url);
      target.append("audio", this.target.audio);
      target.append("ios", this.target.ios);
      target.append("android", this.target.android);
      target.append("image", this.target.image);
      const { data } = await api.create(target);
      this.isLoading = false;
      if(data.success === 0) {
        this.error = data.message
        this.notify('danger', data.message)
      } else {
        this.$router.push('/')
        this.notify('success', 'Target created successfuly.')
      }
    },
    notify(type, message) {
      this.$notify({
        horizontalAlign: 'left',
        verticalAlign: 'bottom',
        message: message,
        type: type
      });
    },
    onAudioFilePicked(event) {
      const files = event.target.files;
      this.target.audio = files[0];
    },
    onVideoFilePicked(event) {
      const files = event.target.files;
      this.target.video = files[0];
    },
    onAndroidPicked(event) {
      const files = event.target.files;
      this.target.android = files[0];
    },
    onIOSPicked(event) {
      const files = event.target.files;
      this.target.ios = files[0];
    },
    onTargetPicked(event) {
      const files = event.target.files;
      this.target.image = files[0];
    }
  }
};
</script>
<style>
</style>
