import axios from "axios";
// import router from "@/router";
// import { Dialog } from "vant";
import { Toast } from "vant";
import i18n from "@/assets/lang/i18n";

// axios config
axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = true
axios.defaults.headers = {
  lang: "en"
};

axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

axios.interceptors.request.use(
  config => {
    const clientId = localStorage.getItem("ClientId");
    config.headers = {
      ...config.headers,
      _t: Date.parse(new Date()) / 1000,
      clientId: clientId
    };
    Toast.loading({
      duration: 0,
      forbidClick: true,
      mask: false
    });
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// http response interceptor
axios.interceptors.response.use(
  // eslint-disable-next-line space-before-function-paren
  function(response) {
    Toast.clear();
    return response;
  },
  // eslint-disable-next-line space-before-function-paren
  function(error) {
    Toast.clear();
    if (error.response.status === 401) {
      // Dialog.alert({
      //   message: "You have been inactive for a while. Please login again.",
      //   confirmButtonText: "Go to Login",
      //   callback: action => {
      //     console.log("back to Home page");
      //     window.localStorage.clear();
      //     router.push({ name: "Home" });
      //   }
      // });
      Toast(i18n.t("Common.serverRequestError"));
      return error.response;
    }

    if (error.response.status === 500) {
      // router.push({
      //   name: "ServerError",
      //   query: { url: window.location.href }
      // });
      Toast(i18n.t("Common.serverRequestError"));
      return error.response;
    }
    return Promise.reject(error);
  }
);

export default axios;
