<template>
  <div class="stack">
    <el-col :span="11" :offset="1">
      <el-card>
        <h2 slot="header">技术栈</h2>
        <p class="indent">
        <ul>
          <li>本系统前端采用 <strong>Vue全家桶</strong> 为核心进行开发</li>
          <li>UI采用 <strong>element-ui</strong> 搭建</li>
        </ul>
        <br />
        <ul>
          <li>后端使用 <strong>nodejs+express</strong> 框架搭建</li>
          <li>数据采用 <strong>MongoDB</strong> 进行存储</li>
          <li>
            用户访问鉴权采用 <strong>JWT+redis黑名单+MongoDB</strong> 实现
          </li>
        </ul>
        <br />
        <ul>
          <li>前后端之间通讯采用 <strong>axios</strong> 进行http请求</li>
        </ul>

          <!-- HTML+CSS+JS+VUE.JS+VUE-ROUTER+VUEX+AXIOS+REDIS+MOMENT.JS+ELEMENT-UI+NODEJS+EXPREESS+JWT+MONGODB -->
        </p>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Stack",
  data() {
    return {};
  },
};
</script>

<style lang="less">
.indent {
  margin-left: 20px;
}
</style>