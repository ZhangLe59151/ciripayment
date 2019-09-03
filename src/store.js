import Vue from "vue";
import Vuex from "vuex";
import { find, findIndex } from "lodash";
import util from "@/util";
Vue.use(Vuex);

const storage = window.localStorage;

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

if (!storage.getItem("ClientId")) {
  const ClientId = guid();
  storage.setItem("ClientId", ClientId);
}

export default new Vuex.Store({
  state: {
    ClientId: storage.getItem("ClientId"),
    deviceType: process.env.VUE_APP_DEVICETYPE,
    BaseWebUrl: process.env.VUE_APP_WEBURL,
    Config:
      process.env.VUE_APP_DEVICETYPE === "APP"
        ? require("@/config/AppConfig")
        : require("@/config/WapConfig"),

    firstLaunch: storage.getItem("firstLaunch")
      ? storage.getItem("firstLaunch")
      : "Yes",
    currency: "฿",
    minBusinessWorthForLoan: 120000,
    allowBack: true,
    serviceOverviewVo: {},
    form: {},
    userInfo: {},
    application: {},
    furtuneQuestion: [],
    showDownloadIcon: process.env.VUE_APP_DEVICETYPE === "WEB",
    recordList: JSON.parse(storage.getItem("recordList")) || [],
    masterList: require("@/assets/data/fortuneMasterList.json"),
    localDateFormatter: "YYYYMMDD",
    nationalCodeList: require("@/assets/data/nationalCodeList.json"),
    nationalCode: require("@/assets/data/nationalCode.json"),
    reg: require("@/assets/reg/regEx.js").regEx,

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

    maxFileSize: 8, // MB

    OTPVerified: storage.getItem("OTPVerified") === "true",
    logInWithPassword: storage.getItem("logInWithPassword") === "true",
    uploadImgUrl:
      process.env.VUE_APP_DEVICETYPE === "APP"
        ? process.env.VUE_APP_BASEURL + "/api/v1/self-onboarding/image/upload"
        : "/api/v1/self-onboarding/image/upload",
    bankList: require("./assets/data/bankInfo.json").list,
    merchantProfile: {},
    recommendChannelsStore: [],
    completeLoanProfile: false,
    loanProfile: {},
    todayDate: "",
    fortuneInfo: storage.getItem("fortuneInfo")
      ? JSON.parse(storage.getItem("fortuneInfo"))
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
  getters: {
    backEvent(state, getters) {
      return state.backEvent;
    }
  },
  mutations: {
    UpdateDownloadIcon(state) {
      const hide = false;
      state.showDownloadIcon = hide;
    },
    InitForm(state) {
      var originForm = state.form !== null ? state.form : {};
      var formString = storage.getItem("form");
      formString = formString !== null ? formString : "{}";
      state.form = Object.assign(originForm, JSON.parse(formString));
    },
    UpdateForm(state, updateForm) {
      state.form = Object.assign(state.form, updateForm);
      storage.setItem("form", JSON.stringify(state.form));
    },
    ClearForm(state) {
      state.form = {};
      storage.setItem("form", "{}");
    },
    OTPVerified(state) {
      state.OTPVerified = true;
      storage.setItem("OTPVerified", "true");
    },
    logInWithPassword(state) {
      state.logInWithPassword = true;
      storage.setItem("logInWithPassword", "true");
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
        storage.removeItem(item);
      });

      // update clientId when user logout
      storage.setItem("ClientId", guid());
    },

    fetchDataFromLocal(state) {
      // fetch merchant profile
      if (
        Object.keys(state.merchantProfile).length === 0 &&
        storage.getItem("merchantProfile")
      ) {
        let localMerchantProfile = JSON.parse(
          storage.getItem("merchantProfile")
        );
        state.merchantProfile = {
          ...state.merchantProfile,
          ...localMerchantProfile
        };
      }
      // fetch application
      if (
        Object.keys(state.application).length === 0 &&
        storage.getItem("application")
      ) {
        let localApplication = JSON.parse(storage.getItem("application"));
        state.application = {
          ...state.application,
          ...localApplication
        };
      }
      // fetch loan Profile
      if (
        Object.keys(state.loanProfile).length === 0 &&
        storage.getItem("loanProfile")
      ) {
        let localLoanProfile = JSON.parse(storage.getItem("loanProfile"));
        state.loanProfile = {
          ...state.loanProfile,
          ...localLoanProfile
        };
      }
      // fetch user Info
      let localUserInfo = JSON.parse(storage.getItem("userInfo"));
      if (
        Object.keys(state.userInfo).length === 0 &&
        storage.getItem("userInfo")
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
      // storage.clear();
      storage.setItem("form", JSON.stringify(form));
    },
    InitUserInfo(state) {
      var originUserInfo = state.userInfo !== null ? state.userInfo : {};
      var userInfoString = storage.getItem("userInfo");
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
      storage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    ClearUserInfo(state) {
      state.userInfo = {};
      storage.setItem("userInfo", "{}");
    },
    UpdateApplicationInfo(state, applicationInfo) {
      state.application = Object.assign(state.application, applicationInfo);
      storage.setItem("application", JSON.stringify(state.application));
    },
    ClearApplicationInfo(state) {
      state.application = {};
      storage.setItem("application", "{}");
    },
    // for Loan profile
    initLoanProfile(state, loanProfile) {
      state.loanProfile = loanProfile;
      storage.setItem("loanProfile", JSON.stringify(loanProfile));
    },
    UpdateLoanProfile(state, updateLoanProfile) {
      state.loanProfile = Object.assign(state.loanProfile, updateLoanProfile);
      storage.setItem("loanProfile", JSON.stringify(state.loanProfile));
    },
    CompleteLoanProfile(state) {
      state.completeLoanProfile = true;
    },
    SaveFortuneInfo(state, updateFortuneInfo) {
      state.fortuneInfo = Object.assign(state.fortuneInfo, updateFortuneInfo);
      storage.setItem("fortuneInfo", JSON.stringify(state.fortuneInfo));
    },
    ClearFortunetellingResult(state) {
      state.fortuneInfo = {
        fortuneResult: {},
        fortuneQuestionUsed: [],
        selectedMaster: {}
      };
      storage.removeItem("fortuneInfo");
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
      storage.setItem("recordList", JSON.stringify(recordList));
    },
    // this is for credit
    InitCredit(state, credit) {
      state.credit = credit;
      storage.setItem("credit", JSON.stringify(credit));
    },
    UpdateCreditLimit(state, creditLimit) {
      state.credit.currentCreditLimit = creditLimit;
      storage.setItem("credit", JSON.stringify(state.credit));
    },
    UpdateCreditAnswer(state, creditAnswer) {
      let questionList = state.credit.questions;
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].id === creditAnswer.id) {
          questionList[i].value = creditAnswer.value;
        }
      }
      storage.setItem("credit", JSON.stringify(state.credit));
    },
    UnfirstLaunch(state) {
      state.firstLaunch = "No";
      storage.setItem("firstLaunch", state.firstLaunch);
    },
    UpdateFurtuneQuestionInfo(state, fortuneQ) {
      // state.furtuneQuestion = Object.assign(state.furtuneQuestion, fortuneQ);

      let furtuneQuestion = state.furtuneQuestion;
      // if dont have, append it
      if (state.furtuneQuestion.length === 0) {
        state.furtuneQuestion = [fortuneQ];
      }
      for (let i = 0; i < furtuneQuestion.length; i++) {
        if (furtuneQuestion[i].id === fortuneQ.id) {
          furtuneQuestion[i] = fortuneQ;
        } else {
          // if not found, append it
          if (i === furtuneQuestion.length - 1) {
            state.furtuneQuestion = state.furtuneQuestion.concat(fortuneQ);
          }
        }
      }
      storage.setItem("furtuneQuestion", JSON.stringify(state.furtuneQuestion));
    },
    ClearFortuneQuestion(state) {
      state.furtuneQuestion = [];
      storage.removeItem("furtuneQuestion");
    }
  },
  actions: {
    updateAppSetting(state, allowBack) {
      state.allowBack = allowBack;
      storage.setItem("allowBack", allowBack);
    }
  }
});
