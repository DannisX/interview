<template>
  <div class="answer">
    <el-row>
      <el-col :span="18" :offset="3">
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
          <!-- 当前题目与答题 -->
          <el-card v-if="!committed && !recite">
            <h3 slot="header">{{ currentQuestion.title }}</h3>
            <!-- 已经提交了且不是背题模式 -->
            <div v-if="!recite && !committed">
              <div>
                <h4 v-if="currentQuestion.code" class="full-line">代码：</h4>
                <p v-html="currentQuestion.code"></p>
              </div>
              <div>
                <h4 class="full-line">回答（多条答案请插入列表作答）：</h4>
                <tiny-edit
                  :value="record.answers"
                  @input="(res) => (record.answers = res)"
                ></tiny-edit>
              </div>

              <el-button type="primary" class="full-line" @click="commitAnswer"
                >提交</el-button
              >
            </div>
            <!-- 已经提交了或者是背题模式 -->
            <div v-if="recite || committed">
              <div
                v-for="(item, i) in currentRecords"
                class="answer"
                :key="item.id"
              >
                <h4 class="answer-title">我的第{{ i + 1 }}次提交：</h4>
                <p v-html="item.answers" class="content"></p>
                <p class="time">{{ item.createdAt | timeFormat }}</p>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row :style="{ margin: '10px 0' }">
      <el-col :span="18" :offset="3">
        <el-card v-if="recite || committed">
          <h4 slot="header">{{ currentQuestion.title }}</h4>
          <div>
            <h4 v-if="currentQuestion.code" class="full-line">代码：</h4>
            <div v-html="currentQuestion.code" disabled></div>
          </div>
          <div>
            <h4 class="full-line">参考答案：</h4>
            <tiny-edit
              :value="currentQuestion.answers"
              @input="(res) => (currentQuestion.answers = res)"
              disabled
            ></tiny-edit>
            <!-- <div v-html="currentQuestion.answers" class="answer"></div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TinyEdit from "../../TinyEdit/TinyEdit";
import moment from "moment";
export default {
  name: "Answer",
  components: {
    TinyEdit,
  },
  created() {
    // 获取所有题目
    this.$store.dispatch("setCurrentQuestions");
  },
  data() {
    return {
      record: {},
      committed: false,
    };
  },
  methods: {
    // 上一题
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
    // 下一题
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
    // 提交答案
    async commitAnswer() {
      try {
        await this.$axios.post(
          `/record/${this.$router.currentRoute.query._id}`,
          {
            record: this.record,
          }
        );
        // 获取所有提交记录
        await this.$store.dispatch("setCurrentRecords");
        // 更改提交状态
        this.committed = true;
      } catch (error) {
        return error;
      }
    },
  },
  filters: {
    timeFormat(inp, format = "YYYY年MM月DD日 HH:mm:ss") {
      return moment(inp).format(format);
    },
  },
  computed: {
    // 映射vuex数据
    ...mapGetters([
      "recite",
      "questions",
      "records",
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
    // 当前条件查询数据
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
    //
    currentRecords() {
      return this.records.filter(
        (item) => item.questionId == this.$route.query._id
      );
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        // 找出当前题目的index
        try {
          const curIndex = this.currentQuestions.findIndex(
            (item) => item._id == newVal.query._id
          );
          if (curIndex < 0) {
            throw new Error(
              "刚刷新的时候vuex中的数据还没获取到，没有题目数据，算不了"
            );
          }
          // 设置当前index
          this.$store.commit("setCurrentIndex", curIndex);
          // 设置当前题目
          this.$store.commit(
            "setCurrentQuestion",
            this.currentQuestions[this.currentQsIndex]
          );

          // 设置当前提交状态
          this.committed = false;
          this.record.answers = "";
        } catch (error) {
          return error;
        }
      },
      deep: true,
      immediate: true,
    },
    currentQuestions: {
      handler(newVal) {
        try {
          const curIndex = newVal.findIndex(
            (item) => item._id == this.$router.currentRoute.query._id
          );
          if (curIndex < 0) {
            throw new Error("没到时候");
          }
          this.$store.commit("setCurrentIndex", curIndex);
          this.$store.commit("setCurrentQuestion", newVal[this.currentQsIndex]);
        } catch (error) {
          return error;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less">
.full-line {
  width: 100%;
  margin: 10px auto;
}

.answer {
  border-bottom: 1px solid #eee;
  margin-left: 20px;
  // overflow: auto;
  &* {
    margin: 10px 0;
  }
  .time {
    font-size: 12px;
    color: #bbb;
    text-align: right;
  }
}
</style>