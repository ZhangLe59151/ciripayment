import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deviceType: process.env.VUE_APP_DEVICETYPE,
    clientInfo: {
      bankName: "ABC Bank"
    },
    serviceOverviewVo: {},
    form: {},
    nationalCodeList: [
      "+66",
      "+65",
      "+62",
      "+880",
      "+855",
      "+86",
      "+852",
      "+91",
      "+81",
      "+82",
      "+60",
      "+63",
      "+84",
      "+95"
    ],
    nationalCode: require("@/assets/data/nationalCode.json"),
    phone: {
      regExp: /^(0[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{7})$/,
      thaiExp: /^(0[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{8})$/,
      sgExp: /^([1-9]{1}[0-9]{7})$/,
      minLen: 9,
      maxLen: 10
    },
    revenue: {
      regExp: /^[0-9]{1,10}$/,
      minLen: 1,
      maxLen: 10
    },
    url: {
      regExp: /^(:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
      httpExp: /http:\/\/|https:\/\//,
      minLen: 9,
      maxLen: 120
    },
    email: {
      regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      maxlen: 320
    },
    password: {
      minLen: 8,
      maxLen: 25,
      regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+=])[A-Za-z\d@$!%*?&]{8,}$/,
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      number: /\d/,
      specialChar: /[!@#$%^\-&*)(_+=]/,
      noSpace: /^\S+$/
    },
    applicationStatus: {
      pending: "0",
      approved: "1",
      rejected: "2"
    },
    validationPatterns: {
      invalidCharset: "~`!@#$%^&*()_-+=",
      nationaldID: /[0-9]{13}/,
      bankAccount: /^[0-9A-Za-z]{5,20}$/,
      postalCode: /[0-9]{5}/
    },
    applicationStatusWording: {
      pending: "UNDER REVIEW",
      approved: "APPROVED",
      rejected: "REJECTED"
    },
    settlementType: [
      {
        id: "1",
        label: "Manual"
      },
      {
        id: "2",
        label: "Auto"
      }
    ],
    paymentChannelIds: {
      visa: "1",
      mastercard: "2",
      promptpay: "3",
      alipay: "4",
      wechatpay: "5"
    },
    aoStatus: [
      {
        label: "UNDER REVIEW",
        id: "0",
        color: "gray"
      },
      {
        label: "APPROVED",
        id: "1",
        color: "green"
      },
      {
        label: "REJECTED",
        id: "2",
        color: "red"
      }
    ],
    paymentChannelStatus: [
      {
        value: "-1",
        name: "default",
        label: "N/A",
        color: "gray"
      },
      {
        value: "0",
        name: "pending",
        label: "UNDER REVIEW",
        color: "blue"
      },
      {
        value: "1",
        name: "enabled",
        label: "ENABLED",
        color: "green"
      },
      {
        value: "2",
        name: "rejected",
        label: "REJECTED",
        color: "red"
      }
    ],
    merchantWorkingChannelStatus: [
      {
        value: "1",
        name: "enabled",
        label: "ENABLED",
        color: "green"
      },
      {
        value: "2",
        name: "diabled",
        label: "DISABLED",
        color: "gray"
      }
    ],
    paymentChannelList: [
      {
        id: "1",
        name: "alipay",
        img: require("@/assets/imgs/ico-alipay.png"),
        label: "Alipay"
      },
      {
        id: "3",
        name: "wechatpay",
        img: require("@/assets/imgs/ico-wechat.png"),
        label: "WeChat Pay"
      },
      {
        id: "2",
        name: "promptpay",
        img: require("@/assets/imgs/ico-promptpay.png"),
        label: "Prompt Pay"
      },
      {
        id: "4",
        name: "visa",
        img: require("@/assets/imgs/ico-visa.png"),
        label: "VISA"
      },
      {
        id: "5",
        name: "mastercard",
        img: require("@/assets/imgs/ico-mastercard.png"),
        label: "Mastercard"
      }
    ],
    paymentChannelStatusWording: {
      default: "PENDING REVIEW",
      pending: "PENDING REVIEW",
      enabled: "ENABLED",
      rejected: "REJECTED"
    },
    idleTime: 600, // seconds
    imageCompressRate: 0.6,
    maxFileSize: 8, // MB
    messages: {
      idleTimeout:
        "You’ve been inactive for too long. For security reasons, please start your application over again."
    },
    logInWithPassword: localStorage.getItem("logInWithPassword") === "true",
    uploadImgUrl:
      process.env.VUE_APP_DEVICETYPE === "APP"
        ? process.env.VUE_APP_BASEURL + "/api/self-onboarding/image/upload"
        : "/api/self-onboarding/image/upload",
    bankList: require("./assets/data/bankInfo.json").list,
    merchantProfile: {}
  },
  mutations: {
    InitForm(state) {
      var originForm = state.form !== null ? state.form : {};
      var formString = window.localStorage.getItem("form");
      formString = formString !== null ? formString : "{}";
      state.form = Object.assign(originForm, JSON.parse(formString));
    },
    UpdateForm(state, updateForm) {
      state.form = Object.assign(state.form, updateForm);
      window.localStorage.setItem("form", JSON.stringify(state.form));
    },
    ClearForm(state) {
      state.form = {};
      window.localStorage.clear();
    },
    logInWithPassword(state) {
      state.logInWithPassword = true;
      localStorage.setItem("logInWithPassword", "true");
    },
    logOut(state) {
      state.logInWithPassword = false;
      localStorage.setItem("logInWithPassword", "false");
    },
    // This is for services
    updateWorkingChannels(state, channels) {
      state.workingChannels = [...state.workingChannels, channels];
    },
    // This is for settlement
    updateSettlement(state, settlement) {
      state.merchantProfile.merchantSettlementConfigVo.settlementType = settlement;
      localStorage.setItem("merchantProfile", JSON.stringify(state.merchantProfile));
    },
    // Fetch merchant profile
    initMerchantProfile(state, merchantProfile) {
      state.merchantProfile = merchantProfile;
      localStorage.setItem("merchantProfile", JSON.stringify(merchantProfile));
    },
    // if there is no merchant profile in store, try to look in storage
    fetchMerchantProfileFromLocal(state) {
      if (Object.keys(state.merchantProfile).length === 0 && localStorage.getItem("merchantProfile")) {
        let localMerchantProfile = JSON.parse(localStorage.getItem("merchantProfile"));
        state.merchantProfile = { ...state.merchantProfile, ...localMerchantProfile };
      }
    },
    removeUselessForm(state) {
      var keys = [
        "applicantPhoneNumber",
        "haveBankAccount",
        "haveBizReg",
        "nationalCode",
        "phone",
        "serviceType"
      ];
      var form = {};
      // eslint-disable-next-line semi-spacing
      for (var i = 0; i < keys.length; i++) {
        if (state.form[`${keys[i]}`]) {
          form[`${keys[i]}`] = state.form[`${keys[i]}`];
        }
      }
      state.form = form;
      window.localStorage.clear();
      window.localStorage.setItem("form", JSON.stringify(form));
    }
  },
  actions: {}
});
