<template>
  <div class="network">
    <el-card>
      <div slot="header"><h1>Network</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
        <el-button type="primary" @click="onGetNetwork"> getNetwork </el-button>
        <el-button type="primary" @click="onGetBlockHeight">
          getBlockHeight
        </el-button>
      </div>
      <div class="text item">
        <el-button type="primary" @click="onGetBlock"> getGetBlock </el-button>
        <el-button type="primary" @click="onGetTransaction">
          getTransaction
        </el-button>
        <el-button type="primary" @click="onGetBalance"> getBalance </el-button>
      </div>
      <div class="text item">
        <el-button type="primary" @click="onGetUnboundOng">
          getUnboundOng
        </el-button>
        <el-button type="primary" @click="onGetGasPrice">
          getGasPrice
        </el-button>
        <el-button type="primary" @click="onGetSmartCodeEvent">
          getSmartCodeEvent
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  name: "network",
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
    async onGetNetwork() {
      const network = await client.api.network.getNetwork();
      alert("onGetNetwork: " + JSON.stringify(network));
    },
    async onGetBlockHeight() {
      const height = await client.api.network.getBlockHeight();
      alert("onGetBlockHeight: " + height);
    },
    async onGetBlock() {
      const block = await client.api.network.getBlock({ block: 1 });
      console.log(JSON.stringify(block));
      // alert("onGetBlock:" + JSON.stringify(block));
    },
    async onGetTransaction() {
      const transaction = await client.api.network.getTransaction({
        txHash:
          "21bd360aaae60b66979ba0a197363f095ac228f19a13087fe06e9f2639d90d08",
      });
      console.log(JSON.stringify(transaction));
      // alert("onGetTransaction:" + JSON.stringify(transaction));
    },
    async onGetBalance() {
      const balance = await client.api.network.getBalance({
        address: "AcyLq3tokVpkMBMLALVMWRdVJ83TTgBUwU",
      });
      alert("onGetBalance:" + JSON.stringify(balance));
    },
    async onGetUnboundOng() {
      const balance = await client.api.network.getUnboundOng({
        address: "AcyLq3tokVpkMBMLALVMWRdVJ83TTgBUwU",
      });
      alert("onGetUnboundOng: " + JSON.stringify(balance));
    },
    async onGetGasPrice() {
      const balance = await client.api.network.getGasPrice();
      alert("onGetGasPrice: " + JSON.stringify(balance));
    },

    async onGetSmartCodeEvent() {
      const events = await client.api.network.getSmartCodeEvent({
        value:
          "3a3f98df1d57be1644025addf041d4402b60091fbc63d0e107e7d264f1965b29",
      });
      alert("onGetSmartCodeEvent" + JSON.stringify(events));
    },
  },
};
</script>

<style scoped>
.network {
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
