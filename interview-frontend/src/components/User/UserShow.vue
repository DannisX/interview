<template>
  <div class="user-show">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <h2 slot="header">
            个人信息
            <el-button type="primary" class="fr edit" @click="userEdit"
              >编辑</el-button
            >
          </h2>
          <el-container>
            <el-aside width="180px">
              <div class="block">
                <el-avatar
                  shape="square"
                  :size="150"
                  :src="user.avatar"
                  fit="fill"
                ></el-avatar>
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
                  <el-input v-model="user.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                  <el-input v-model="user.email" disabled></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserShow",
  data() {
    return {};
  },
  methods: {
    userEdit() {
      this.$router.push({ name: "userEdit" });
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
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="less">
.user-show {
  margin-top: 20px;
}
.block {
  .el-avatar {
    margin-left: 20px;
  }
}

.edit {
  margin-right: 18px;
}
</style>