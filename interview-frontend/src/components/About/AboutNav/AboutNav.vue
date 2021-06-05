<template>
  <div class="about-nav">
    <el-col :span="6" :offset="3">
      <el-menu
        default-active="1"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link :to="{ name: 'description' }">系统描述</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ name: 'stack' }">技术栈</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link :to="{ name: 'contact' }">联系方式</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "AboutNav",
  data() {
    return {};
  },
};
</script>

<style>
</style>