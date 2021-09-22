<template>
  <div class="oep4">
    <el-card>
      <div slot="header"><h1>Oep4</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <h3>Transfer</h3>
        <el-form-item label="Amount">
          <el-input v-model="form.amount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Recipient">
          <el-input v-model="form.recipient"></el-input>
        </el-form-item>
        <el-form-item label="Asset">
          <el-input v-model="form.asset"></el-input>
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
  name: "oep4",
  data() {
    return {
      form: {
        amount: "",
        recipient: "",
        asset: "",
      },
    };
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
    async onSend(){
        const to=this.form.recipient;
        const amount=this.form.amount;
        const asset=this.form.asset;
        try{
            const result =await client.api.asset.send({to,asset,amount});
            alert("onSend finished, txHash:"+result);
        } catch(e){
            alert("onSend canceled");
            console.log("onSend error:",e);
        }
    }
  },
};
</script>
<style scoped>
.oep4 {
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
