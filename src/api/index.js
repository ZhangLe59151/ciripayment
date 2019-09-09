import Vue from "vue";
import axios from "./http";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

// const instance = axios.create({
//   baseURL: "",
//   headers: { Cookie: document.cookie }
// });
const API_VERSION_V1 = "/api/v1";

export default {
  sendOtp(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/otp/send", params);
  },
  sendMerchantOtp(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/otp/send", params);
  },
  verifyOtp(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/otp/verify", params);
  },
  verifyMerchantOtp(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/otp/verify", params);
  },
  uploadImage(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/image/upload", params);
  },
  submitAppliction(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/application/submit", params);
  },
  serviceOverview(params) {
    return Vue.axios.get(API_VERSION_V1 + "/self-onboarding/application/service-overview");
  },
  getApplictionStatus(params) {
    // it use in Setting page & home page
    return Vue.axios.get(API_VERSION_V1 + "/self-onboarding/application/status", params);
  },
  getAccountInfo(params) {
    return Vue.axios.get(API_VERSION_V1 + "/self-onboarding/account/info", params);
  },
  getMerchantAccountInfo() {
    return Vue.axios.get(API_VERSION_V1 + "/merchant/check-status");
  },
  checkPasswordExistence(params) {
    return Vue.axios.get(
      API_VERSION_V1 + "/self-onboarding/password/check-existence",
      params
    );
  },
  merchantLoginPassword(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/login", params);
  },
  merchantCreateNewPassword(params) {
    return Vue.axios.post(API_VERSION_V1 + "/self-onboarding/password/set-password", params);
  },
  deleteApplication(params) {
    return Vue.axios.post(API_VERSION_V1 + "/admin/deleteApplication", params);
  },
  checkDuplicate(params) {
    return Vue.axios.post(
      API_VERSION_V1 + "/self-onboarding/application/check-duplicate",
      params
    );
  },
  checkNationId(params) {
    return Vue.axios.post(
      API_VERSION_V1 + "/self-onboarding/application/check-nationalId",
      params
    );
  },
  getProfileInfo() {
    return Vue.axios.get(API_VERSION_V1 + "/self-onboarding/application/profile");
  },
  getMerchantProfile(params) {
    return Vue.axios.get(API_VERSION_V1 + "/merchant/profile", params);
  },
  updateMerchantSettlement(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/settlement/update", params);
  },
  updateBankAcc(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/bank-account/update", params);
  },
  updateMerchantChannels(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/channels/update", params);
  },
  updateBusinessProfile(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/profile/update", params);
  },
  submitMerchantChannels(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/channels/submit", params);
  },
  getFortunetelling(params) {
    return Vue.axios.get(API_VERSION_V1 + `/lucky-draw?masterId=${params}`);
  },
  getResultOnWeb(params) {
    return Vue.axios.get(API_VERSION_V1 + `/lucky-draw/view?shareKey=${params}`);
  },
  likeFortunetellingResult(params) {
    return Vue.axios.get(API_VERSION_V1 + `/lucky-draw/like?id=${params}`);
  },
  unlikeFortunetellingResult(params) {
    return Vue.axios.get(API_VERSION_V1 + `/lucky-draw/unlike?id=${params}`);
  },
  getHomePageInfo() {
    return Vue.axios.get(API_VERSION_V1 + "/homepage");
  },
  verifyLoanApplyAble() {
    return Vue.axios.post(API_VERSION_V1 + "/loan/verify");
  },
  applyLoan(params) {
    return Vue.axios.post(API_VERSION_V1 + "/loan-application?loanAmount", params);
  },
  getLatestLoan() {
    return Vue.axios.get(API_VERSION_V1 + "/loan/view");
  },
  getLoanHistory() {
    return Vue.axios.get(API_VERSION_V1 + "/loan/all");
  },
  getLoanById(params) {
    return Vue.axios.get(API_VERSION_V1 + `/loan/id?id=${params}`);
  },
  getHomeInformation() {
    return Vue.axios.get(API_VERSION_V1 + "/information");
  },
  getRecordList() {
    return Vue.axios.get(API_VERSION_V1 + "/merchant/record/list");
  },
  getArticleContent(params) {
    return Vue.axios.get(
      API_VERSION_V1 + `/information/article-detail?articleDetailId=${params}`
    );
  },
  addRecord(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/record/add", params);
  },
  viewRecordSum(params) {
    return Vue.axios.get(API_VERSION_V1 + `/merchant/record/view/sum?accountDate=${params}`);
  },
  viewRecord(params) {
    return Vue.axios.get(API_VERSION_V1 + `/merchant/record/view?id=${params}`);
  },
  deleteRecord(params) {
    return Vue.axios.get(API_VERSION_V1 + `/merchant/record/delete?id=${params}`);
  },
  updateRecord(params) {
    return Vue.axios.post(API_VERSION_V1 + "/merchant/record/update", params);
  },
  feedback(params) {
    return Vue.axios.post(API_VERSION_V1 + "/feedback", params);
  },
  getCreditQuestion() {
    return Vue.axios.get(API_VERSION_V1 + "/credit/limit");
  },
  submitCreditAnswer(params) {
    return Vue.axios.post(API_VERSION_V1 + "/credit/limit/answer", params);
  },
  logout(params) {
    return Vue.axios.post(API_VERSION_V1 + "/logout", params);
  },
  getQuestionPersonal(params) {
    return Vue.axios.get(API_VERSION_V1 + `/common-question?sourceType=${params}`);
  },
  postAnswerPersonal(params) {
    return Vue.axios.post(API_VERSION_V1 + "/common-question/answer", params);
  },
  getQuestionF() {
    return Vue.axios.get(API_VERSION_V1 + "/fortune-telling/question");
  },
  postAnswerF(params) {
    return Vue.axios.post(API_VERSION_V1 + "/fortune-telling/question/answer", params);
  },
  getLikeCount() {
    return Vue.axios.get(API_VERSION_V1 + "/lucky-draw/like-count");
  }
};
