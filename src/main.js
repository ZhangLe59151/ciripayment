import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";

import axios from "axios";
import VueAxios from "vue-axios";
import api from "./api";
import "@/assets/js/main.js";
import "vant/lib/index.css";
import "@/assets/css/main.scss";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import moment from "moment-timezone";

import Vant, { Notify, Swipe, SwipeItem, Checkbox, CheckboxGroup } from "vant";

import VueSignaturePad from "vue-signature-pad";

Vue.use(ElementUI);

Vue.use(VueAxios, axios);
Vue.use(Vant);
Vue.use(Notify);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(VueI18n);
Vue.use(VueSignaturePad);

Vue.prototype.$api = api;
Vue.prototype.$moment = moment;
Vue.prototype.$find = find;
Vue.prototype.$notify = Notify;
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "en",
  messages: {
    en: require("@/assets/lang/en.json")
  }
});

new Vue({
  router,
  store,
  i18n,
  components: { App },
  render: h => h(App)
}).$mount("#app");
