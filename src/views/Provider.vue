<template>
  <div class="provider">
    <el-card>
      <div slot="header"><h1>Provider</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
        <el-button type="primary" @click="onGetProvider">
          GetProvider
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  name: "provider",
  data() {
    return {};
  },
  methods: {
    initClient() {
      client.registerClient({
        logMessages: false,
        logWarnings: false,
        extension: provider.ExtensionType.Cyano,
      });
      alert("已完成初始化！");
    },
    async onGetProvider() {
      try {
        const result = await client.api.provider.getProvider();
        alert("onGetProvider: " + JSON.stringify(result));
      } catch (e) {
        alert("No dAPI provider istalled.");
      }
    },
  },
};
</script>
<style scoped>
.provider {
  width: 60%;
  margin: 0 auto;
}
.item {
  margin-bottom: 20px;
}
.el-button {
  width: 180px;
}
</style>
