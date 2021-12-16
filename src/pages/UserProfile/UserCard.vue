<template>
  <card class="card-user">
    <div v-if="user">
      <div class="author mt-2">
        <img
          class="avatar border-white"
          :src="`./api/pictures/agents/${user.profile_pic}`"
          alt="..."
        />
        <h4 class="title">
          {{ user.name }}
          <br />
          <a href="#">
            <small>{{ user.surname }}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        {{ user.nationality }}
        <br />
        {{ user.address }}
      </p>
    </div>
    <hr v-if="user" />
    <div class="row" v-if="user">
      <div class="col-6">
        <h5>
          National ID:
          {{ user.nationalid }}
        </h5>
      </div>
      <div class="row" v-if="user">
        <div class="col-6">
          <h5>KYC Photo</h5>
          <img
            :src="`${user.image}`"
            alt="KYC Image Here"
            class="w-100 text-center shadow-sm"
          />
        </div>
      </div>
      <div class="col-4 p-5">
        <h5>Action</h5>
        <p-button
          v-if="user.status == 'active'"
          size="sm"
          round
          outline
          block
          @click.native="$emit('changeStatus', 'suspended', user)"
          >Suspend</p-button
        >
        <p-button
          v-if="user.status == 'suspended'"
          size="sm"
          round
          outline
          block
          @click.native="$emit('changeStatus', 'active', user)"
          >Activate</p-button
        >
        <p-button
          v-if="user.status == 'pending'"
          size="sm"
          round
          outline
          block
          @click.native="$emit('changeStatus', 'active', user)"
          >Approve</p-button
        >
        <p-button
          v-if="user.status == 'pending'"
          size="sm"
          round
          outline
          block
          @click.native="$emit('changeStatus', 'rejected', user)"
          >Reject</p-button
        >
        <p v-if="user.status === 'rejected'">User rejected.</p>
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
