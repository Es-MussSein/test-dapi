<template>
  <div class="box-card">
    <el-card>
      <div slot="header" class="clearfix"></div>
      <div class="text item"></div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
