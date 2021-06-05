<template>
  <div class="answer">
    <el-row>
      <el-col :span="10" :offset="3">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-button
              type="text"
              :disabled="currentQsIndex <= 0"
              @click="prevQs"
            >
              <i class="el-icon-back"></i>
              上一题
            </el-button>
            <el-button
              type="text"
              :disabled="currentQsIndex >= total - 1"
              @click="nextQs"
              class="fr"
            >
              下一题
              <i class="el-icon-right"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card>
              <h3 slot="header">{{ currentQuestion.title }}</h3>
              <div>
                <h4 v-if="currentQuestion.code">代码：</h4>
                <p v-html="currentQuestion.code"></p>
              </div>
              <div>
                <h4>回答：</h4>
                <tiny-edit
                  :value="answer"
                  @input="(res) => (answer = res)"
                ></tiny-edit>
              </div>
              <el-button type="primary">提交</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <h4 slot="header">{{ currentQuestion.title }}</h4>
          <div>
            <h4 v-if="currentQuestion.code">代码：</h4>
            <div v-html="currentQuestion.code" disabled></div>
          </div>
          <div>
            <h4>答案：</h4>
            <div
              v-for="item in currentQuestion.answers"
              v-html="item.answer"
            ></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TinyEdit from "../../TinyEdit/TinyEdit";
export default {
  name: "Answer",
  components: {
    TinyEdit,
  },
  created() {
    this.$store.dispatch("setCurrentQuestions");
  },
  data() {
    return {
      code: `<p>这是很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的答案</p>
        <pre class="language-javascript"><code>function fn(){\n    let a=10;\n    return ()=&gt;a\n}</code></pre>`,
      answer: "",
    };
  },
  methods: {
    prevQs() {
      if (this.currentQsIndex >= 1) {
        // 更改当前Index
        this.$store.commit("setCurrentIndex", this.currentQsIndex - 1);
        // 改变路由，以达到修改当前题目的目的
        this.$router.push({
          name: "answerQs",
          query: { _id: this.currentQuestions[this.currentQsIndex]._id },
        });
      }
    },
    nextQs() {
      if (this.currentQsIndex < this.total - 1) {
        // 更改当前Index
        this.$store.commit("setCurrentIndex", this.currentQsIndex + 1);
        // 改变路由，以达到修改当前题目的目的
        this.$router.push({
          name: "answerQs",
          query: { _id: this.currentQuestions[this.currentQsIndex]._id },
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "questions",
      "total",
      "currentQsIndex",
      "currentQuestion",
      "queryOpts",
      "queryPage",
      "queryLimit",
      "queryType",
      "querySortby",
      "queryOrder",
      "queryTitle",
    ]),
    currentQuestions() {
      const filterQuestions = this.questions.filter((item) => {
        return (
          item.type.includes(this.queryType) &&
          item.title.includes(this.queryTitle)
        );
      });

      // 排序
      const sortedQuestions = filterQuestions.sort((a, b) => {
        return this.queryOrder > 0
          ? a[this.querySortby] - b[this.querySortby]
          : b[this.querySortby] - a[this.querySortby];
      });
      this.$store.commit("setTotal", filterQuestions.length);
      if (sortedQuestions.length <= this.queryLimit) {
        this.$store.commit("setQueryPage", 1);
      }
      return sortedQuestions;
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        // 找出当前题目的index
        const curIndex = this.currentQuestions.findIndex(
          (item) => item._id == newVal.query._id
        );
        this.$store.commit("setCurrentIndex", curIndex);
        this.$store.commit(
          "setCurrentQuestion",
          this.currentQuestions[this.currentQsIndex]
        );
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
</style>