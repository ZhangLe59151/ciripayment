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

import "element-ui/lib/theme-chalk/index.css";

import moment from "moment-timezone";

import Vant, { Notify } from "vant";
import "@/amfe";

import i18n from "./assets/lang/i18n";

import {
  Dialog,
  Input,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Steps,
  Step
} from "element-ui";
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Step);

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
      analytics.logEvent(binding.value.event, binding.value.params);
    });
  }
});

if (window.location.protocol === "file:") {
  let cordovaScript = document.createElement("script");
  cordovaScript.setAttribute("type", "text/javascript");
  cordovaScript.setAttribute("src", "cordova.js");
  document.body.appendChild(cordovaScript);
}

new Vue({
  router,
  store,
  i18n,
  components: { App },
  render: h => h(App),
  el: "#app"
}).$mount("#app");

window.handleOpenURL = function(url) {
  console.log("received url: " + url);
  const _url = url.split("taokae://")[1];
  router.push(_url);
};
