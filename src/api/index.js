import Vue from "vue";
import axios from "./http";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  sendOtp(params) {
    return Vue.axios.post("/api/self-onboarding/otp/send", params);
  },
  sendMerchantOtp(params) {
    return Vue.axios.post("/api/merchant/otp/send", params);
  },
  verifyOtp(params) {
    return Vue.axios.post("/api/self-onboarding/otp/verify", params);
  },
  verifyMerchantOtp(params) {
    return Vue.axios.post("/api/merchant/otp/verify", params);
  },
  uploadImage(params) {
    return Vue.axios.post("/api/self-onboarding/image/upload", params);
  },
  submitAppliction(params) {
    return Vue.axios.post("/api/self-onboarding/application/submit", params);
  },
  serviceOverview(params) {
    return Vue.axios.get("/api/self-onboarding/application/service-overview");
  },
  getApplictionStatus(params) {
    // it use in Setting page & home page
    return Vue.axios.get("/api/self-onboarding/application/status", params);
  },
  getAccountInfo(params) {
    return Vue.axios.get("/api/self-onboarding/account/info", params);
  },
  getMerchantAccountInfo() {
    return Vue.axios.get("/api/merchant/check-status");
  },
  checkPasswordExistence(params) {
    return Vue.axios.get(
      "/api/self-onboarding/password/check-existence",
      params
    );
  },
  merchantLoginPassword(params) {
    return Vue.axios.post("/api/self-onboarding/login", params);
  },
  merchantCreateNewPassword(params) {
    return Vue.axios.post("/api/self-onboarding/password/set-password", params);
  },
  deleteApplication(params) {
    return Vue.axios.post("/api/admin/deleteApplication", params);
  },
  checkDuplicate(params) {
    return Vue.axios.post(
      "/api/self-onboarding/application/check-duplicate",
      params
    );
  },
  checkNationId(params) {
    return Vue.axios.post(
      "/api/self-onboarding/application/check-nationalId",
      params
    );
  },
  getProfileInfo() {
    return Vue.axios.get("/api/self-onboarding/application/profile");
  },
  getMerchantProfile(params) {
    return Vue.axios.get("/api/merchant/profile", params);
  },
  updateMerchantSettlement(params) {
    return Vue.axios.post("/api/merchant/settlement/update", params);
  },
  updateBankAcc(params) {
    return Vue.axios.post("/api/merchant/bank-account/update", params);
  },
  updateMerchantChannels(params) {
    return Vue.axios.post("/api/merchant/channels/update", params);
  },
  updateBusinessProfile(params) {
    return Vue.axios.post("/api/merchant/profile/update", params);
  },
  submitMerchantChannels(params) {
    return Vue.axios.post("/api/merchant/channels/submit", params);
  },
  getFortunetelling(params) {
    return Vue.axios.get(`/api/lucky-draw?masterId=${params}`);
  },
  getHomePageInfo() {
    return Vue.axios.get("/api/homepage");
  },
  applyLoan(params) {
    return Vue.axios.post(`/api/loan-application?loanAmount=${params}`);
  },
  getLoanProfile() {
    return Vue.axios.get("/api/loan/view");
  },
  getHomeInformation() {
    return Vue.axios.get("/api/information");
  },
  getRecordList() {
    return Vue.axios.get("/api/merchant/record/list");
  },
  getArticleContent(params) {
    return Vue.axios.get(`/api/information/article-detail?articleDetailId=${params}`);
  },
  addRecord(params) {
    return Vue.axios.post("/api/merchant/record/add", params);
  },
  viewRecordSum(params) {
    return Vue.axios.get(`/api/merchant/record/view/sum?accountDate=${params}`);
  },
  viewRecord(params) {
    return Vue.axios.get(`/api/merchant/record/view?id=${params}`);
  },
  deleteRecord(params) {
    return Vue.axios.get(`/api/merchant/record/delete?id=${params}`);
  },
  updateRecord(params) {
    return Vue.axios.post("/api/merchant/record/update", params);
  },
  feedback(params) {
    return Vue.axios.post("/api/feedback", params);
  },
  getQuestion() {
    return Vue.axios.get("/api/credit/limit");
  },
  submitQuestion(params) {
    return Vue.axios.post("/api/credit/limit",params);
  },
};
