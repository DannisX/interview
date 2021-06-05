<template>
  <div class="record-list">
    <el-col :span="6">
      <el-table :data="recordList" style="width: 100%" stripe>
        <el-table-column prop="id" label="#" width="50px"> </el-table-column>
        <el-table-column prop="title" label="title"> </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "RecordList",
  data() {
    return {
      recordList: [
        {
          id: 1,
          title: "div和span的区别",
        },
        {
          id: 2,
          title: "div和span的区别",
        },
        {
          id: 3,
          title: "div和span的区别",
        },
        {
          id: 4,
          title: "div和span的区别",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>