import Vue from "vue";
import Vuex from "vuex";
import { find, findIndex } from "lodash";
import util from "@/util";
Vue.use(Vuex);

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

if (!localStorage.getItem("ClientId")) {
  const ClientId = guid();
  localStorage.setItem("ClientId", ClientId);
}

export default new Vuex.Store({
  state: {
    BaseWebUrl: process.env.VUE_APP_WEBURL,
    ClientId: localStorage.getItem("ClientId"),
    Config:
      process.env.VUE_APP_DEVICETYPE === "APP"
        ? require("@/config/AppConfig")
        : require("@/config/WapConfig"),
    deviceType: process.env.VUE_APP_DEVICETYPE,
    clientInfo: {
      bankName: "ABC Bank"
    },
    firstLuanch: localStorage.getItem("firstLuanch") || true,
    currency: "฿",
    serviceOverviewVo: {},
    form: {},
    userInfo: {},
    application: {},
    furtuneQuestion: {},
    recordList: JSON.parse(localStorage.getItem("recordList")) || [],
    masterList: require("@/assets/data/fortuneMasterList.json"),
    localDateFormatter: "YYYYMMDD",
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
    dateInMonth: require("@/assets/data/dateInMonth.json"),
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
      postalCode: /[0-9]{5}/,
      englishAlphabetAndThai: /^[a-z\u0E00-\u0E7F]+$/i
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
    merchantApplyingChannelStatus: [
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
        name: "approved",
        label: "APPROVED",
        color: "green"
      },
      {
        value: "2",
        name: "rejected",
        label: "REJECTED",
        color: "red"
      },
      {
        value: "4",
        name: "on_hold",
        label: "ON HOLD",
        color: "gray"
      }
    ],
    paymentChannelList: [
      {
        id: "1",
        name: "visa",
        img: require("@/assets/imgs/ico-visa.png"),
        label: "VISA"
      },
      {
        id: "2",
        name: "mastercard",
        img: require("@/assets/imgs/ico-mastercard.png"),
        label: "Mastercard"
      },
      {
        id: "3",
        name: "promptpay",
        img: require("@/assets/imgs/ico-promptpay.png"),
        label: "Prompt Pay"
      },
      {
        id: "4",
        name: "alipay",
        img: require("@/assets/imgs/ico-alipay.png"),
        label: "Alipay"
      },
      {
        id: "5",
        name: "wechatpay",
        img: require("@/assets/imgs/ico-wechat.png"),
        label: "WeChat Pay"
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
    OTPVerified: localStorage.getItem("OTPVerified") === "false",
    logInWithPassword: localStorage.getItem("logInWithPassword") === "true",
    uploadImgUrl:
      process.env.VUE_APP_DEVICETYPE === "APP"
        ? process.env.VUE_APP_BASEURL + "/api/self-onboarding/image/upload"
        : "/api/self-onboarding/image/upload",
    bankList: require("./assets/data/bankInfo.json").list,
    merchantProfile: {},
    recommendChannelsStore: [],
    completeLoanProfile: false,
    loanProfile: {},
    todayDate: "",
    fortuneInfo: localStorage.getItem("fortuneInfo")
      ? JSON.parse(localStorage.getItem("fortuneInfo"))
      : {
        fortuneResult: {},
        fortuneQuestionUsed: [],
        selectedMaster: {}
      },
    credit: {
      currentCreditLimit: 5000,
      questions: {}
    }
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
      // window.localStorage.clear();
      window.localStorage.setItem("form", "{}");
    },
    OTPVerified(state) {
      state.OTPVerified = true;
      localStorage.setItem("OTPVerified", "true");
    },
    logInWithPassword(state) {
      state.logInWithPassword = true;
      localStorage.setItem("logInWithPassword", "true");
    },
    logOut(state) {
      util.removeCookies("SSID");
      state.userInfo.creditLimit = null;
      state.loanProfile = {};
      state.credit = {};
      state.OTPVerified = false;
      state.logInWithPassword = false;

      state.fortuneInfo = {
        fortuneResult: {},
        fortuneQuestionUsed: [],
        selectedMaster: {}
      };

      [
        "OTPVerified",
        "logInWithPassword",
        "recommendChannelsStore",
        "loanProfile",
        "fortuneInfo",
        "application",
        "userInfo",
        "form",
        "serviceOverviewVo",
        "credit"
      ].forEach(item => {
        localStorage.removeItem(item);
      });

      // update clientId when user logout
      localStorage.setItem("ClientId", guid());
    },
    // This is for settlement
    updateSettlement(state, settlement) {
      state.merchantProfile.merchantSettlementConfigVo.settlementType = settlement;
      localStorage.setItem(
        "merchantProfile",
        JSON.stringify(state.merchantProfile)
      );
    },
    // This is for channels
    updateChannels(state, newList) {
      state.merchantProfile.merchantChannelConfigVoList = newList;
      localStorage.setItem(
        "merchantProfile",
        JSON.stringify(state.merchantProfile)
      );
    },
    updateRecommendChannel(state, channels) {
      state.recommendChannelsStore = channels;
    },
    // Fetch merchant profile
    initMerchantProfile(state, merchantProfile) {
      state.merchantProfile = merchantProfile;
      localStorage.setItem("merchantProfile", JSON.stringify(merchantProfile));
    },
    fetchDataFromLocal(state) {
      // fetch merchant profile
      if (
        Object.keys(state.merchantProfile).length === 0 &&
        localStorage.getItem("merchantProfile")
      ) {
        let localMerchantProfile = JSON.parse(
          localStorage.getItem("merchantProfile")
        );
        state.merchantProfile = {
          ...state.merchantProfile,
          ...localMerchantProfile
        };
      }
      // fetch application
      if (
        Object.keys(state.application).length === 0 &&
        localStorage.getItem("application")
      ) {
        let localApplication = JSON.parse(localStorage.getItem("application"));
        state.application = {
          ...state.application,
          ...localApplication
        };
      }
      // fetch loan Profile
      if (
        Object.keys(state.loanProfile).length === 0 &&
        localStorage.getItem("loanProfile")
      ) {
        let localLoanProfile = JSON.parse(localStorage.getItem("loanProfile"));
        state.loanProfile = {
          ...state.loanProfile,
          ...localLoanProfile
        };
      }
      // fetch user Info
      let localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (
        Object.keys(state.userInfo).length === 0 &&
        localStorage.getItem("userInfo")
      ) {
        state.userInfo = {
          ...state.userInfo,
          ...localUserInfo
        };
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
      // window.localStorage.clear();
      window.localStorage.setItem("form", JSON.stringify(form));
    },
    InitUserInfo(state) {
      var originUserInfo = state.userInfo !== null ? state.userInfo : {};
      var userInfoString = window.localStorage.getItem("userInfo");
      userInfoString = userInfoString !== null ? userInfoString : "{}";
      state.userInfo = Object.assign(
        originUserInfo,
        JSON.parse(userInfoString)
      );
    },
    UpdateUserInfo(state, updateUserInfo) {
      // state.userInfo = Object.assign(state.userInfo, updateUserInfo);
      // change to spread
      state.userInfo = { ...state.userInfo, ...updateUserInfo };
      window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    ClearUserInfo(state) {
      state.userInfo = {};
      window.localStorage.setItem("userInfo", "{}");
    },
    UpdateApplicationInfo(state, applicationInfo) {
      state.application = Object.assign(state.application, applicationInfo);
      window.localStorage.setItem(
        "application",
        JSON.stringify(state.application)
      );
    },
    ClearApplicationInfo(state) {
      state.application = {};
      window.localStorage.setItem("application", "{}");
    },
    // for Loan profile
    initLoanProfile(state, loanProfile) {
      state.loanProfile = loanProfile;
      localStorage.setItem("loanProfile", JSON.stringify(loanProfile));
    },
    UpdateLoanProfile(state, updateLoanProfile) {
      state.loanProfile = Object.assign(state.loanProfile, updateLoanProfile);
      window.localStorage.setItem(
        "loanProfile",
        JSON.stringify(state.loanProfile)
      );
    },
    CompleteLoanProfile(state) {
      state.completeLoanProfile = true;
    },
    SaveFortuneInfo(state, updateFortuneInfo) {
      state.fortuneInfo = Object.assign(state.fortuneInfo, updateFortuneInfo);
      window.localStorage.setItem(
        "fortuneInfo",
        JSON.stringify(state.fortuneInfo)
      );
    },
    ClearFortunetellingResult(state) {
      state.fortuneInfo = {
        fortuneResult: {},
        fortuneQuestionUsed: [],
        selectedMaster: {}
      };
      window.localStorage.removeItem("fortuneInfo");
    },
    // this is for record
    UpdateRecord(state, updateRecordInfo) {
      const recordList = Array.from(state.recordList);
      const itemIndex = findIndex(recordList, {
        accountDate: updateRecordInfo.accountDate
      });
      const item = find(recordList, {
        accountDate: updateRecordInfo.accountDate
      });
      if (item) {
        // udpate
        recordList[itemIndex] = updateRecordInfo;
      } else {
        recordList.push(updateRecordInfo);
      }
      state.recordList = recordList;
      window.localStorage.setItem("recordList", JSON.stringify(recordList));
    },
    // this is for credit
    InitCredit(state, credit) {
      state.credit = credit;
      localStorage.setItem("credit", JSON.stringify(credit));
    },
    UpdateCreditLimit(state, creditLimit) {
      state.credit.currentCreditLimit = creditLimit;
      window.localStorage.setItem("credit", JSON.stringify(state.credit));
    },
    UpdateCreditAnswer(state, creditAnswer) {
      let questionList = state.credit.questions;
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].id === creditAnswer.id) {
          questionList[i].value = creditAnswer.value;
        }
      }
      window.localStorage.setItem("credit", JSON.stringify(state.credit));
    },
    UnfirstLaunch() {
      window.localStorage.setItem("firstLuanch", false);
    },
    UpdateFurtuneQuestionInfo(state, fortuneQ) {
      state.furtuneQuestion = Object.assign(state.furtuneQuestion, fortuneQ);
      window.localStorage.setItem(
        "furtuneQuestion",
        JSON.stringify(state.furtuneQ)
      );
    },
    ClearFortuneQuestion(state) {
      state.furtuneQuestion = {};
      window.localStorage.removeItem("furtuneQuestion");
    }
  },
  actions: {}
});
