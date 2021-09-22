<template>
  <div class="message">
    <el-card>
      <div slot="header"><h1>Message</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <h3>Sign message</h3>
        <el-form-item label="Message">
          <el-input type="textarea" v-model="form.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onSignMessage">Sign</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form_2" label-width="80px">
        <h3>Verify message</h3>
        <el-form-item label="Message">
          <el-input type="textarea" v-model="form_2.message"></el-input>
        </el-form-item>
        <el-form-item label="Signature">
          <el-input type="textarea" v-model="form_2.signature"></el-input>
        </el-form-item>
        <el-form-item label="Public Key">
          <el-input type="textarea" v-model="form_2.publicKey"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onVerifyMessage">Verify</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  name: "message",
  data() {
    return {
      form: {
        message: "",
      },
      form_2: {
        message: "",
        signature: "",
        publicKey: "",
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
    async onSignMessage() {
      try {
        const result = await client.api.message.signMessage({
          message: this.form.message,
        });
        console.log("signature:", result);
        alert("onSignMessage finished, signature:" + result.data);
      } catch (e) {
        alert("onSignMessage canceled");
        console.log("onSignMessage error:", e);
      }
    },
    async onVerifyMessage() {
      const signature = {
        data: this.form_2.signature,
        publicKey: this.form_2.publicKey,
      };
      try {
        const result = await client.api.message.verifyMessage({
          message: this.form_2.message,
          signature,
        });
        alert("onVerifyMessage finished, result:" + result);
      } catch (e) {
        alert("onVerifyMessage canceled");
        console.log("onVerifyMessage error:", e);
      }
    },
  },
};
</script>
<style scoped>
.message {
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
