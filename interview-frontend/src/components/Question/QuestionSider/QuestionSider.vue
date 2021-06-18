<template>
  <div class="question-sider">
    <el-row :gutter="10">
      <el-col :span="18" :offset="3">
        <el-col :span="4" v-for="item in questionType" :key="item.id">
          <el-button
            type="default"
            class="full"
            @click="typeSelect(item.type)"
            >{{ item.type }}</el-button
          >
        </el-col>
        <el-col :span="4" v-if="isAdmin">
          <el-button class="full" @click="turnToAdd"
            >Add New Question
          </el-button>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuestionSider",
  data() {
    return {
      questionType: [
        {
          id: 1,
          type: "All",
        },
        {
          id: 2,
          type: "HTML/CSS",
        },
        {
          id: 3,
          type: "JS/jQuery/ES6+",
        },
        {
          id: 4,
          type: "Nodejs",
        },

        {
          id: 5,
          type: "Vue/React",
        },
        {
          id: 6,
          type: "Webpack/Gulp",
        },
        {
          id: 7,
          type: "miniProgram",
        },
        {
          id: 8,
          type: "Algorithm",
        },
        {
          id: 9,
          type: "Network Protocol",
        },
        {
          id: 10,
          type: "Optimization",
        },
        {
          id: 11,
          type: "Human Resource",
        },
      ],
      // isAdmin: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isAdmin() {
      return this.user.authority == "Admin";
    },
  },
  methods: {
    typeSelect(type) {
      type = type.toLowerCase();
      if (type == "all") {
        type = "";
      }
      this.$store.commit("setQueryType", type);
      this.$store.commit("setQueryPage", 1);
    },
    turnToAdd() {
      this.$router.push({ name: "addNew" });
    },
  },
};
</script>

<style lang="less">
.question-sider {
  margin-top: 20px;
  margin-bottom: 20px;
}

.full {
  width: 100%;
  line-height: 50px;
  margin: 10px 0;
}
</style>