import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Card, Form, FormItem, Input, Select, Option, Switch } from "element-ui"

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
