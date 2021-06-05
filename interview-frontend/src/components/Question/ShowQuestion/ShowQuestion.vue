<template>
  <div class="show-question">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="keyword"
              placeholder="请输入搜索关键字"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="questionsShow"
              style="width: 100%"
              @row-click="rowClick"
            >
              <el-table-column prop="rank_id" label="#" width="50px">
              </el-table-column>
              <el-table-column prop="title" label="title"> </el-table-column>
              <el-table-column prop="type" label="类型" width="120">
              </el-table-column>
              <el-table-column prop="frequency" label="出现频率" width="120">
              </el-table-column>
              <el-table-column prop="difficulty" label="难易程度" width="120">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-pagination
              layout="prev, pager, next"
              background
              hide-on-single-page
              :page-size="queryLimit"
              :current-page="queryPage"
              @prev-click="currentChange"
              @next-click="currentChange"
              @current-change="currentChange"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "showQuestion",
  data() {
    return {
      // questionsShow: [],
      // total: 0,
      keyword: "",
    };
  },
  computed: {
    ...mapGetters([
      "questions",
      "total",
      "queryOpts",
      "queryPage",
      "queryLimit",
      "queryType",
      "querySortby",
      "queryOrder",
      "queryTitle",
    ]),
    questionsShow() {
      // 获取条件查询到的题目数组
      const filterQuestions = this.questions.filter((item) => {
        return (
          item.type.includes(this.queryType) &&
          item.title.includes(this.queryTitle)
        );
      });
      this.$store.commit("setTotal", filterQuestions.length);
      if (filterQuestions.length <= this.queryLimit) {
        this.$store.commit("setQueryPage", 1);
      }
      // 排序
      const sortedQuestions = filterQuestions.sort((a, b) => {
        return this.queryOrder > 0
          ? a[this.querySortby] - b[this.querySortby]
          : b[this.querySortby] - a[this.querySortby];
      });
      // 分页
      const currentPageQuestions = sortedQuestions.filter((item, i) => {
        return (
          i >= (this.queryPage - 1) * this.queryLimit &&
          i < this.queryPage * this.queryLimit
        );
      });

      return currentPageQuestions;
    },
  },
  created() {
    // 请求数据并保存至本地
    this.queryQuestions();
  },
  methods: {
    rowClick(row, col, e) {
      // 找出当前点击的项的题目信息
      const currentQuestion = this.questions.find(
        (item) => item.rank_id === row.rank_id
      );
      // 将当前点击项的_id传入答题页面
      this.$router.push({
        name: "answerQs",
        query: { _id: currentQuestion._id },
      });
    },
    currentChange(curpage) {
      this.$store.commit("setQueryPage", curpage);
    },
    queryQuestions() {
      //#region 根据查询条件从后端获取数据
      // this.$axios
      //   .get(
      //     `/questions?page=${this.queryPage}&limit=${this.queryLimit}&type=${this.queryType}&sortby=${this.querySortby}&order=${this.queryOrder}&title=${this.queryTitle}`
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     this.questions = res.data.questions;
      //     this.total = res.data.total;
      //   });
      //#endregion

      // this.$axios.get(`/questionsAll`).then((res) => console.log(res));
      // 一次性获取后端所有数据并将数据存在本地，然后再操作本地数据，减少Http请求
      this.$store.dispatch("setCurrentQuestions");
    },
  },
  watch: {
    // 监测查询参数的变化，并根据新的参数重新请求新的
    keyword: {
      handler(newVal) {
        this.$store.commit("setQueryTitle", newVal);
      },
    },
  },
};
</script>

<style>
</style>