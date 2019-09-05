import Vue from "vue";
import axios from "./http";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const API_VERSION_V1 = "/api/v1";

export default {
  sendOtp(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/otp/send", params);
  }
}