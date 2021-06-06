<template>
  <div class="records">
    <el-col :span="16" :offset="1">
      <el-card>
        <div slot="header">{{ currentQuestion.title }}</div>
        <div>
          <h4>代码：</h4>
          <div v-html="currentQuestion.code"></div>
        </div>
        <div v-for="(item, i) in currentRecords" class="answer">
          <h4 class="answer-title">我的第{{ i + 1 }}次提交：</h4>
          <p v-html="item.answers" class="content"></p>
          <p class="time">{{ item.createdAt | timeFormat }}</p>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import moment from "moment";
export default {
  name: "Records",
  data() {
    return {};
  },
  filters: {
    timeFormat(inp, format = "YYYY年MM月DD日 HH:mm:ss") {
      return moment(inp).format(format);
    },
  },
  computed: {
    ...mapGetters(["questions", "records"]),
    currentQuestion() {
      return this.questions.find((item) => item._id == this.$route.query._id);
    },
    currentRecords() {
      return this.records.filter(
        (item) => item.questionId == this.currentQuestion._id
      );
    },
  },
};
</script>

<style>
</style>