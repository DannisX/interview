<template>
  <div class="register">
    <el-col :span="6" :offset="15">
      <el-card shadow="hover">
        <h2 slot="header">注册</h2>
        <el-form ref="form" :model="user" :rules="formRules" label-width="80px">
          <el-form-item label="名字" prop="name">
            <el-input
              v-model="user.name"
              placeholder="请输入你的名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="user.email"
              placeholder="请输入你的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="user.password"
              show-password
              placeholder="请输入你的密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="confirm">
            <el-input
              v-model="user.confirm"
              show-password
              placeholder="请再次输入你的密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :style="{ width: '100%', margin: '10px 0' }"
          @click="register('form')"
        >
          注册
        </el-button>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validateName = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("昵称不能为空"));
      } else if (!/^[\u4e00-\u9fa5]{2,4}$|^[A-Z][a-zA-Z]{2,10}$/.test(val)) {
        return callback(new Error("请输入2-4个汉字或2-10个英文字母"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请输入密码"));
      } else if (!/^[\w\d]{6,16}$/.test(val)) {
        return callback(
          new Error("请输入由字母、数字、下划线组成的6-16位密码")
        );
      } else {
        callback();
      }
    };

    var validateConfirm = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请再次输入密码"));
      } else if (val != this.user.password) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("邮箱不能为空"));
      } else if (!/\w+@[a-z0-9]+\.[a-z]{2,4}/.test(val)) {
        return callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    return {
      user: {
        authority: "common",
      },
      formRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        confirm: [{ validator: validateConfirm, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    register(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const encodeData = this.$encrypt(this.user);
          this.$axios
            .post("/users", { encodeData })
            .then((res) => {
              const { user } = res.data;
              this.$message({
                message: `恭喜你，用户 ${user.name} 注册成功!`,
                type: "success",
              });
              this.$router.push({ name: "login" });
            })
            .catch((err) => {
              console.log(err.response);
            });
        } else {
          this.$message.error({
            message: "请检查表单数据",
            duration: 1500,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>