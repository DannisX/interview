<template>
  <div class="contact">
    <el-col :span="11" :offset="1">
      <el-card>
        <h2 slot="header">联系方式</h2>
        <h4>手机号：</h4>
        <p style="text-indent: 20px">13510074845</p>
        <h4>邮箱：</h4>
        <p style="text-indent: 20px">758089075@qq.com</p>
        <h4>微信：</h4>
        <el-image
          style="width: 200px; height: 200px"
          :src="src"
          :fit="fit"
        ></el-image>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      src: "https://static01.imgkr.com/temp/a62289c6d6fe4c6f86e21673aa7ad4f1.jpg",
      fit: "contain",
    };
  },
};
</script>

<style>
</style>