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
          {{ user.full_name }}
          <br />
          <a href="#">
            <small>{{ user.email }}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        {{ user.unit }}  
        <br />
        {{ user.location }}
      </p>
    </div>
    <hr v-if="user" />
    <div class="row" v-if="user">
      <div class="col-6">
        <h5>
          Contact Person: 
          {{ user.contact_person }}
        </h5>
        <h5>
          Phone: 
          {{ user.phone }}
        </h5>
        <h5>
          Balance: 
          {{ user.balance }}
        </h5>
        <h5>
          Bank Name: 
          {{ user.bank_name }}
        </h5>
        <h5>
          Account Number: 
          {{ user.acc_number }}
        </h5>
        <h5>
          User status: 
          {{ user.status }}
        </h5>
      </div>
      <div class="col-4 p-5">
        <h5>Change Status</h5>
        <p-button
            v-if="user.status == 'active'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('changeStatus', 'suspended', user)"
          >Suspend</p-button>
          <p-button
            v-if="user.status == 'suspended'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('changeStatus', 'active', user)"
          >Activate</p-button>
          <p-button
            v-if="user.status == 'pending'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('changeStatus', 'active', user)"
          >Approve</p-button>
          <p-button
            v-if="user.status == 'pending'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('changeStatus', 'rejected', user)"
          >Reject</p-button>
          <p v-if="user.status === 'rejected'">User rejected.</p>
      </div>
    </div>
    <div class="row" v-if="user">
      <div class="col-6">
        <h5>Registration</h5>
        <img :src="`./api/pictures/agents/${user.registration}`" alt="Registration Image Here" class="w-100 text-center shadow-sm" />
      </div>
      <div class="col-6">
        <h5>Location Picture / Selfie</h5>
        <img :src="`./api/pictures/agents/${user.photo}`" alt="Location Picture / Selfie Here" class="w-100 text-center shadow-sm" />
      </div>
    </div>
  </card>
</template>
<script>
export default {
  props:{
    user: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
  },
};
</script>
<style>
</style>
