<template>
  <header class="header">
    <el-menu
      default-active="2"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <a href="javascript:;">
          <i class="el-icon-bangzhu"></i>
          Interview
        </a>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ name: 'home' }">主页</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{ name: 'user' }">用户信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link :to="{ name: 'qsShow' }">题库</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link :to="{ name: 'record' }">提交记录</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link :to="{ name: 'about' }">关于我们</router-link>
      </el-menu-item>
      <el-menu-item v-if="!isLogin" index="7" class="fr">
        <router-link :to="{ name: 'register' }">注册</router-link>
      </el-menu-item>
      <el-menu-item v-if="!isLogin" index="8" class="fr">
        <router-link :to="{ name: 'login' }">登录</router-link>
      </el-menu-item>

      <el-menu-item v-if="isLogin" index="9" class="fr">
        <span @click="logout">登出</span>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="10" class="fr">
        <span>{{ user.email }}</span>
      </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$axios
        .get("/user/logout")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.$router.push({ name: "login" });
    },
  },
  created() {
    // this.$axios
    //   .get("/user")
    //   .then((res) => {
    //     this.$store.dispatch("setCurrentUser", res.data.user);
    //   })
    //   .catch((err) => err);
  },
  computed: {
    ...mapGetters(["user"]),
    isLogin() {
      let res =
        this.$store.getters.isLogin ||
        sessionStorage.getItem("isLogin") == "true";
      return res;
    },
  },
};
</script>

<style lang="less">
</style>