<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
      <th>Action</th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td
            v-for="(column, index) in columns"
            :key="index"
            
          >
          <span v-if="hasValue(item, column)">
              {{itemValue(item, column)}}
          </span>
          </td>
        </slot>
        <td v-if="hasValue(item, 'status')">
          <p-button
            v-if="itemValue(item, 'status') == 'active'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('suspended', item, index)"
          >Suspend</p-button>
          <p-button
            v-if="itemValue(item, 'status') == 'suspended'"
            size="sm"
            round
            outline
            block
            @click.native="$emit('active', item, index)"
          >Activate</p-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "paper-table",
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "hover"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    actions: {
      type: Array,
      default: () => ["delete"]
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style>
</style>
