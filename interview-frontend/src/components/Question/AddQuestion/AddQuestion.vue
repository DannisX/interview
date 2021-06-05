<template>
  <div class="add-question">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <div slot="header">
            <h3>添加题目</h3>
          </div>
          <el-form ref="addNewForm" :model="question">
            <el-form-item label="标题">
              <el-input
                v-model="question.title"
                placeholder="请输入题目"
              ></el-input>
            </el-form-item>
            <el-form-item label="代码">
              <tiny-edit
                :value="question.code"
                @input="(res) => (code = res)"
              ></tiny-edit>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型">
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
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出现频率">
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
                <el-form-item label="难易程度">
                  <el-select
                    v-model="question.difficulty"
                    placeholder="placeholder"
                  >
                    <el-option label="容易" value="easy"></el-option>
                    <el-option label="较易" value="easier"></el-option>
                    <el-option label="一般" value="mid"></el-option>
                    <el-option label="较难" value="difficult"></el-option>
                    <el-option label="难" value="quiteDifficult"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="答案（多条答案请使用有序列表）">
              <tiny-edit
                :value="answer"
                @input="(res) => (code = res)"
              ></tiny-edit>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="submitQuestion"
            :style="{ width: '100%', margin: '10px 0' }"
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
    return {
      question: {
        title: "",
        code: "",
        type: "html/css",
        frequency: "low",
        difficulty: "easy",
      },
      answer: "",
    };
  },
  components: {
    TinyEdit,
  },
  methods: {
    submitQuestion() {},
  },
};
</script>

<style lang='less'>
</style>