<template>
  <div class="user-show">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <h2 slot="header">
            信息编辑
            <el-button type="text" class="fr edit" @click="passwordDrawer"
              >密码修改</el-button
            >
          </h2>

          <el-container>
            <el-aside width="180px">
              <div class="block">
                <!-- <el-avatar
                  shape="square"
                  :size="150"
                  :src="avatarUrl"
                  fit="fill"
                  class="mt10"
                ></el-avatar> -->
                <el-upload
                  :action="action"
                  :show-file-list="false"
                  :headers="myheaders"
                  name="avatar"
                  :on-success="successUpload"
                  :before-upload="beforeUpload"
                >
                  <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    width="150"
                    height="150"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-aside>
            <el-main>
              <el-form ref="userShowForm" :model="user" label-width="80px">
                <el-form-item label="ID：">
                  <el-input v-model="user._id" disabled></el-input>
                </el-form-item>
                <el-form-item label="权限：">
                  <el-input v-model="user.authority" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  @click="submitEdit"
                  :style="{ width: '100%', margin: '10px 0' }"
                  >提交</el-button
                >
              </el-form>
            </el-main>
          </el-container>
        </el-card>
        <el-drawer
          title="密码修改"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose"
        >
          <el-form
            ref="passwordForm"
            :model="password"
            :rules="passwordRules"
            label-width="80px"
          >
            <el-form-item label="旧密码" prop="passwordOld">
              <el-input v-model="password.passwordOld" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="password.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="密码确认" prop="confirmNew">
              <el-input v-model="password.confirmNew" show-password></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="default" @click="handleClose">取消</el-button>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-button type="primary" @click="submitPass('passwordForm')"
                  >确定</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserShow",
  data() {
    var validatePasswordOld = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var validateConfirmNew = (rule, val, callback) => {
      if (!val) {
        return callback(new Error("请再次输入新密码"));
      } else if (val != this.password.password) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    return {
      drawer: false,
      password: {},
      direction: "rtl",
      passwordRules: {
        passwordOld: [{ validator: validatePasswordOld, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        confirmNew: [{ validator: validateConfirmNew, trigger: "blur" }],
      },
      action: "http://192.168.3.232:3000/api/user/avatarupload",
      myheaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // imageUrl: "",
      avatarUrl:
        "https://static01.imgkr.com/temp/a62289c6d6fe4c6f86e21673aa7ad4f1.jpg",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    submitEdit() {
      // 加密数据
      const encodeData = this.$encrypt(this.user);
      this.$axios
        .put("/user", { encodeData })
        .then((res) => console.log(res.data))
        .catch((err) => err);
    },
    passwordDrawer() {
      this.drawer = true;
    },

    handleClose() {
      this.drawer = false;
    },
    submitPass(form) {
      const encodeData = this.$encrypt(this.password);
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.put("/password", { encodeData }).then((res) => {
            this.$message({
              message: "密码修改成功！",
              type: "success",
              duration: 1500,
            });
            this.password = {
              ...this.password,
              password: "",
              passwordOld: "",
              confirmNew: "",
            };
            this.drawer = false;
          });
        }
      });
    },
    successUpload(res, file, fileList) {
      this.user.avatar = URL.createObjectURL(file.raw);
      // this.imageUrl = res.data.path;
    },
    beforeUpload(file) {
      let isImg =
        file.type === "image/jpg" || "image/jpeg" || "image/png" || "image/gif";
      if (!isImg) {
        this.$message.error({
          message: "图片格式不正确",
          duration: 1500,
        });
      }
      let lt2M = file.size / 1024 / 1024 < 2;
      if (!lt2M) {
        this.$message.error({
          message: "图片大小不能超过2M",
          duration: 1500,
        });
      }
      return isImg && lt2M;
    },
  },
  created() {
    this.$axios
      .get("/user")
      .then((res) => {
        this.$store.dispatch("setCurrentUser", res.data.user);
      })
      .catch((err) => err);
  },
};
</script>

<style lang="less">
.user-show {
  margin-top: 20px;
}
.block {
  .el-avatar,
  .el-upload img {
    margin-left: 20px;
  }
}
.mt10 {
  margin-top: 10px;
}

.edit {
  margin-right: 18px;
}
</style>