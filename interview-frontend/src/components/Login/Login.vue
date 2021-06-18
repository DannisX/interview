<template>
  <div class="login">
    <el-col :span="7" :offset="15">
      <el-card>
        <h2 slot="header">
          登录
          <el-button type="text" class="fr" @click="turnToRegister">
            去注册
          </el-button>
        </h2>
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="账号" prop="name">
            <el-input
              v-model="user.name"
              placeholder="请输入你的账户名或邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="user.password"
              show-password
              placeholder="请输入你的密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :style="{ width: '100%', margin: '10px 0' }"
          @click="login"
        >
          登录
        </el-button>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...

    next((vm) => {
      vm.$store.dispatch("setCurrentLogStatus", null);
      vm.$store.dispatch("setCurrentUser", null);
    });
  },
  methods: {
    turnToRegister() {
      this.$router.push({ name: "register" });
    },
    login() {
      const encodeData = this.$encrypt(this.user);
      this.$axios
        .post("/users/login", { encodeData })
        .then((res) => {
          const { user, access_token, refresh_token } = res.data;
          // user信息存入本地
          this.$store.dispatch("setCurrentUser", user);
          // token存入会话
          localStorage.setItem("token", access_token);
          localStorage.setItem("refreshToken", refresh_token);

          // 更改登录状态
          this.$store.dispatch("setCurrentLogStatus", true);
          this.$message({
            message: "登录成功！",
            type: "success",
            duration: 2000,
          });
          this.$router.push({ name: "home" });
        })
        .catch((err) => console.log(err.response.data));
    },
  },
};
</script>

<style>
</style>