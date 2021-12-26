<template>
  <card class="card-user">
    <div v-if="user">
      <div class="author mt-2">
        <h4 class="title">Review KYC</h4>
      </div>
    </div>
    <hr v-if="user" />
    <div class="row" v-if="user">
      <div class="col-6">
        <h5>
          Name:
          {{ user.name }}
        </h5>
        <h5>
          Surname:
          {{ user.surname }}
        </h5>
        <h5>
          Date of Birth:
          {{ user.dob }}
        </h5>
        <h5>
          National ID:
          {{ user.nationalid }}
        </h5>
        <h5>
          Nationality:
          {{ user.nationality }}
        </h5>
      </div>
      <div class="col-6">
        <h5>
          Address 1:
          {{ user.address1 }}
        </h5>
        <h5>
          Address 2:
          {{ user.address2 }}
        </h5>
        <h5>
          City:
          {{ user.city }}
        </h5>
        <h5>
          Zip:
          {{ user.zip }}
        </h5>
        <h5>
          State:
          {{ user.state }}
        </h5>
        <h5>
          Country:
          {{ user.country }}
        </h5>
      </div>
      <div class="row m-0" v-if="user">
        <div class="col-12">
          <h5>KYC Photo</h5>
          <img
            :src="`${user.image}`"
            alt="KYC Image Missing"
            class="w-100 text-center shadow-sm"
          />
        </div>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {},
};
</script>
<style>
</style>
