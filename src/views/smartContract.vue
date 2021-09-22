<template>
  <div class="smartContract">
    <el-card>
      <div slot="header"><h1>smartContract</h1></div>
      <div class="text item">
        <el-button type="primary" @click="initClient"> InitClient </el-button>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <h3>ScCall</h3>
        <el-form-item label="Contract">
          <el-input v-model="form.contract"></el-input>
        </el-form-item>
        <el-form-item label="Method">
          <el-input v-model="form.method"></el-input>
        </el-form-item>
        <el-form-item label="Gas price">
          <el-input v-model="form.gasPrice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Gas limit">
          <el-input v-model="form.gasLimit"></el-input>
        </el-form-item>
        <el-form-item label="Require" type="checkbox">
          <el-switch v-model="form.requireIdentity"></el-switch>
        </el-form-item>
        <el-form-item label="Type">
          <el-select
            v-model="form.type"
            placeholder="Please select the type"
            style="width: 100%"
          >
            <el-option label="Boolean" value="Boolean"></el-option>
            <el-option label="Integer" value="Integer"></el-option>
            <el-option label="ByteArray" value="ByteArray"></el-option>
            <el-option label="String" value="String"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <!-- <el-form-item label="parameters">
          <el-input v-model="form.parameters"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="submit" @click="onScCall">Call SC</el-button>
        </el-form-item>
      </el-form>

      <el-button type="submit" @click="onScCallRead">
        Call SC ReadOnly
      </el-button>
      <el-button type="submit" @click="onScCallReadArray">
        Call SC ReadOnly
      </el-button>
      <el-button type="submit" @click="onScCallReadMap">
        Call SC ReadOnly
      </el-button>
      <el-button type="submit" @click="onScDeploy"> Deploy SC </el-button>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  name: "smartContract",
  data() {
    return {
      form: {
        contract: "bd76a5917e0444d4b615b87c5912362164676dc7",
        method: "Add",
        gasPrice: "5500",
        gasLimit: "100000000",
        requireIdentity: "",
        parameters: [
          {
            type: "Integer",
            value: "5",
          },
          {
            type: "Integer",
            value: "4",
          },
        ],
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
    async onScCall() {
      const scriptHash = this.form.contract;
      const operation = this.form.method;
      const gasPrice = this.form.gasPrice;
      const gasLimit = this.form.gasLimit;
      const requireIdentity = this.form.requireIdentity;
      const parametersRaw = this.form.parameters;
      const args = parametersRaw.map((item) => {
        return {
          type: item.type,
          value: this.convertValue(item.value, item.type),
        };
      });

      try {
        const result = await client.api.smartContract.invoke({
          scriptHash,
          operation,
          args,
          gasPrice,
          gasLimit,
          requireIdentity,
        });
        // tslint:disable-next-line:no-console
        console.log("onScCall finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCall canceled");
        // tslint:disable-next-line:no-console
        console.log("onScCall error:", e);
      }
    },
    async onScCallRead() {
      const scriptHash = "b4c21cf0d9a33613a63e6af4b5cb95e9d532d3eb";
      const operation = "Hello";
      const parametersRaw = [{ type: "Integer", value: "5" }];
      const args = parametersRaw.map((raw) => ({
        type: raw.type,
        value: this.convertValue(raw.value, raw.type),
      }));

      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          operation,
          args,
        });
        console.log("onScCallRead finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCallRead canceled");
        // tslint:disable-next-line:no-console
        console.log("onScCallRead error:", e);
      }
    },
    async onScCallReadArray() {
      const scriptHash = "b4c21cf0d9a33613a63e6af4b5cb95e9d532d3eb";
      const operation = "Hello";
      const parameter0 = "5";
      const parameter1 = "6";
      const parameter0type = "Integer";
      const parameter1type = "Integer";
      const args = [
        {
          type: "",
          value: [
            {
              type: parameter0type,
              value: this.convertValue(parameter0, parameter0type),
            },
            {
              type: parameter1type,
              value: this.convertValue(parameter1, parameter1type),
            },
          ],
        },
      ];
      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          operation,
          args,
        });
        // tslint:disable-next-line:no-console
        console.log("onScCallRead finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCallRead canceled");
        // tslint:disable-next-line:no-console
        console.log("onScCallRead error:", e);
      }
    },
    async onScCallReadMap() {
      // const
    },
    async onScDeploy() {},

    convertValue(value, type) {
      switch (type) {
        case "Boolean":
          return Boolean(value);
        case "Integer":
          return Number(value);
        case "ByteArray":
          return value;
        case "String":
          return client.api.utils.strToHex(value);
      }
    },
  },
};
</script>
<style scoped>
.smartContract {
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
