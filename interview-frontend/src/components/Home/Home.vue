<template>
  <div class="home">
    <div class="bg">
      <div class="bg-mask">
        <el-row>
          <el-col :span="18" :offset="3">
            <h1 class="title">Let's Start!</h1>
            <el-row class="btn-pos">
              <el-col :span="6" :offset="7">
                <el-button type="success" class="btn" @click="changeMode(true)">
                  <i class="el-icon-back"></i>
                  背题模式
                  <i class="el-icon-document"></i>
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="success"
                  class="btn"
                  @click="changeMode(false)"
                >
                  <i class="el-icon-document"></i>
                  答题模式
                  <i class="el-icon-right"></i>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setRecite"]),
    changeMode(bool) {
      this.setRecite(bool);
      this.$router.push({ name: "qsShow" });
    },
  },
};
</script>

<style lang="less">
.home {
  color: #fff;
  margin-top: 10px;
  .bg {
    width: 80vw;
    height: 80vh;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.2);
    background: url("../../assets/interviewBg1.jpg") no-repeat;
    background-size: 100% 100%;
    z-index: -1;
    .bg-bg-mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
.title {
  text-align: center;
  position: relative;
  top: 20vh;
  letter-spacing: 5px;
}
.btn-pos {
  position: relative;
  top: 30vh;
}

.btn {
  font-size: 18px;
}
</style>