<template>
  <div class="records">
    <el-col :span="16" :offset="1">
      <el-card>
        <div slot="header">div和span的区别</div>
        <div v-html="code"></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Records",
  data() {
    return {
      code: `<p>这是很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的答案</p>
        <pre class="language-javascript"><code>function fn(){\n    let a=10;\n    return ()=&gt;a\n}</code></pre>`,
    };
  },
};
</script>

<style>
</style>