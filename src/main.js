import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./autoMixinComponents";

import axios from "axios";
import VueAxios from "vue-axios";
import api from "./api";
import analytics from "./firebase/analytics";
import "@/assets/js/main.js";
import "vant/lib/index.css";
import "@/assets/css/main.scss";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import moment from "moment-timezone";

import Vant, { Notify } from "vant";
import "@/amfe";

import i18n from "./assets/lang/i18n";

Vue.use(ElementUI);

Vue.use(VueAxios, axios);
Vue.use(Vant);

// Vue.use(VueSignaturePad);

Vue.prototype.$api = api;
Vue.prototype.$analytics = analytics;
Vue.prototype.$moment = moment;
Vue.prototype.$find = find;
Vue.prototype.$notify = Notify;
Vue.config.productionTip = false;

Vue.directive("analytics", {
  bind: function(el, binding, vnode) {
    el.addEventListener("click", () => {
      if (!binding.value.params) {
        binding.value.params = {};
      }
      binding.value.params["login"] = true;
      binding.value.params["lang"] = "en";
      analytics.logEvent(binding.value.event, binding.value.params);
    });
  }
});

new Vue({
  router,
  store,
  i18n,
  components: { App },
  render: h => h(App),
  el: "#app"
}).$mount("#app");
