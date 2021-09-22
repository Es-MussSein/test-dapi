<template>
  <div class="asset">
    <el-card>
      <div slot="header"><h1>Asset</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
        <el-button type="primary" @click="onGetAccount"> getAccount </el-button>
        <el-button type="primary" @click="onGetPublicKey">
          getPublicKey
        </el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <h3>Transfer</h3>
        <el-form-item label="Amount">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="Recipient">
          <el-input v-model="form.to"></el-input>
        </el-form-item>
        <el-form-item label="Asset">
          <el-select
            v-model="form.asset"
            placeholder="Please select the asset"
            style="width: 100%"
          >
            <el-option label="ONT" value="ONT"></el-option>
            <el-option label="ONG" value="ONG"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onSend">Make Transfer</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  name: "Asset",
  components: {},
  data() {
    return {
      form: {
        amount: "",
        to: "",
        asset: "",
      },
    };
  },
  methods: {
    //每次都要先初始化
    initClient() {
      client.registerClient({
        logMessages: false,
        logWarnings: false,
        extension: provider.ExtensionType.Cyano,
      });
      alert("已完成初始化！");
    },
    async onGetAccount() {
      const account = await client.api.asset.getAccount();
      alert("getAccount" + JSON.stringify(account));
    },
    async onGetPublicKey() {
      const account = await client.api.asset.getPublicKey();
      alert("getPublicKey" + JSON.stringify(account));
    },
    async onSend() {
      const { to, amount, asset } = this.form;
      try {
        const result = await client.api.asset.send({
          to,
          asset,
          amount,
        });
        alert("onSend finished, txHash:" + result);
      } catch (e) {
        alert("onSend canceled");
        console.log("onSend error:", e);
      }
    },
  },
};
</script>

<style scoped>
.asset {
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
