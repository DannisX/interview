<template>
  <div class="record-list">
    <el-col :span="6">
      <el-table
        :data="committedQuestions"
        style="width: 100%"
        stripe
        @row-click="selectQuestion"
      >
        <el-table-column prop="rank_id" label="#" width="50px">
        </el-table-column>
        <el-table-column prop="title" label="title"> </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RecordList",
  data() {
    return {
      recordList: [],
    };
  },
  computed: {
    ...mapGetters(["questions", "records"]),
    committedQuestions() {
      return this.questions.filter((item) => {
        return this.records.find((record) => record.questionId == item._id)
          ? true
          : false;
      });
    },
  },
  methods: {
    selectQuestion(row, col, e) {
      const currentQuestion = this.committedQuestions.find(
        (item) => item.rank_id == row.rank_id
      );

      this.$router.push({
        name: "records",
        query: { _id: currentQuestion._id },
      });
    },
  },
};
</script>

<style>
</style>