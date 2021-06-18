<template>
  <div class="add-question">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <div slot="header">
            <h3>添加题目</h3>
          </div>
          <el-form ref="addNewForm" :model="question" :rules="questionRules">
            <el-form-item label="标题：" prop="title">
              <el-input
                v-model="question.title"
                placeholder="请输入题目"
              ></el-input>
            </el-form-item>
            <el-form-item label="代码：" prop="code">
              <tiny-edit
                :value="question.code"
                @input="(res) => (question.code = res)"
              ></tiny-edit>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型：" prop="type">
                  <el-select v-model="question.type" placeholder="placeholder">
                    <el-option label="HTML/CSS" value="html/css"></el-option>
                    <el-option
                      label="JS/jQuery/ES6+"
                      value="js/jquery/es6+"
                    ></el-option>
                    <el-option label="Nodejs" value="nodejs"></el-option>
                    <el-option label="Vue/React" value="vue/react"></el-option>
                    <el-option
                      label="Webpack/Gulp"
                      value="webpack/gulp"
                    ></el-option>
                    <el-option
                      label="miniProgram"
                      value="miniprogram"
                    ></el-option>
                    <el-option label="Algorithm" value="algorithm"></el-option>
                    <el-option
                      label="Network Protocol"
                      value="network protocol"
                    ></el-option>
                    <el-option
                      label="Optimization"
                      value="optimization"
                    ></el-option>
                    <el-option
                      label="Human Resource"
                      value="human resource"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出现频率：" prop="frequency">
                  <el-select
                    v-model="question.frequency"
                    placeholder="placeholder"
                  >
                    <el-option label="低" value="low"></el-option>
                    <el-option label="较低" value="lower"></el-option>
                    <el-option label="中" value="mid"></el-option>
                    <el-option label="较高" value="higher"></el-option>
                    <el-option label="高" value="high"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="难易程度：" prop="difficulty">
                  <el-select
                    v-model="question.difficulty"
                    placeholder="placeholder"
                  >
                    <el-option label="容易" value="easy"></el-option>
                    <el-option label="较易" value="easier"></el-option>
                    <el-option label="一般" value="mid"></el-option>
                    <el-option label="较难" value="difficult"></el-option>
                    <el-option label="难" value="hard"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="答案（多条答案请使用有序列表）：">
              <tiny-edit
                :value="question.answers"
                @input="(res) => (question.answers = res)"
              ></tiny-edit>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="submitQuestion('addNewForm')"
            class="full-line"
            >提交</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TinyEdit from "../../TinyEdit/TinyEdit";
export default {
  name: "AddQuestion",
  data() {
    var validateTitle = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请输入标题！"));
      } else {
        callback();
      }
    };
    var validateType = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("题目类型不能为空！"));
      } else {
        callback();
      }
    };

    var validateFrequency = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("题目出现频率不能为空！"));
      } else {
        callback();
      }
    };

    var validateDifficulty = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("题目难易程度不能为空！"));
      } else {
        callback();
      }
    };

    return {
      question: {
        title: "",
        code: "",
        type: "html/css",
        frequency: "low",
        difficulty: "easy",
        answers: "",
      },
      questionRules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        type: [{ validator: validateType, trigger: "blur" }],
        frequency: [{ validator: validateFrequency, trigger: "blur" }],
        difficulty: [{ validator: validateDifficulty, trigger: "blur" }],
      },
    };
  },
  components: {
    TinyEdit,
  },
  methods: {
    submitQuestion(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/questions", { question: this.question })
            .then((res) => {
              // 添加完成之后提示
              this.$message({
                message: "题目添加成功！",
                type: "success",
                duration: 1500,
              });
              // 获取最新的数据
              this.$store.dispatch("setCurrentQuestions");
              // 跳转至题目显示页面
              this.$router.push({ name: "qsShow" });
            });
        }
      });
    },
  },
};
</script>

<style lang='less'>
</style>