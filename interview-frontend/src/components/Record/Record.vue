<template>
  <div class="record">
    <record-list></record-list>
    <router-view></router-view>
  </div>
</template>

<script>
import RecordList from "./RecordList/RecordList.vue";
export default {
  name: "Record",
  components: {
    RecordList,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("setCurrentQuestions");
    this.$store.dispatch("setCurrentRecords");
  },
};
</script>

<style>
</style>