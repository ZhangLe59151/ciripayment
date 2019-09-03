import Vue from "vue";
import Router from "vue-router";
import analytics from "../firebase/analytics";
// import { Store } from "vuex";

import store from "../store";

Vue.use(Router);

const routeArr = [
  {
    path: "/",
    redirect: to => {
      return localStorage.getItem("firstLaunch") ? "/home" : "/landing-page";
    }
  },
  {
    path: "/enter-info",
    name: "EnterInfo",
    component: () => import("@/views-app/EnterInfo.vue"),
    meta: {
      title: ""
    }
  },

  {
    path: "/sic",
    name: "SIC",
    component: () => import("@/views-app/loan/Sic.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/subsic",
    name: "SubSIC",
    component: () => import("@/views-app/loan/SubSic.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/mcc",
    name: "MCC",
    component: () => import("@/views-app/loan/Mcc.vue"),
    meta: {
      title: "MCC"
    }
  },
  {
    path: "/province",
    name: "Province",
    component: () => import("@/views-app/Province.vue"),
    meta: {
      title: "Province"
    }
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views-app/Success.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/view-application",
    name: "ViewApplication",
    component: () => import("@/views-app/ViewApplication.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/tc",
    name: "TermsAndConditions",
    component: () => import("@/views-app/TermsAndConditions.vue"),
    meta: {
      title: "SettingTnC"
    }
  },
  {
    path: "/tc-web",
    name: "TermsAndConditionsOnWeb",
    component: () => import("@/views-app/TermsAndConditionsOnWeb.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/preview-info",
    name: "PreviewInfo",
    component: () => import("@/views-app/PreviewInfo.vue"),
    meta: {
      title: ""
    }
  },

  {
    path: "/services-info",
    name: "ServicesInfo",
    component: () => import("@/views-app/ServicesInfo.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: () => import("@/views-app/UpdateProfile.vue"),
    meta: {
      title: ""
    }
  },
  // Other Area
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views-app/Admin.vue"),
    meta: {
      title: ""
    }
  }
];

const AppRouteArr = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views-app/Home.vue"),
    meta: {
      title: "Home",
      allowBack: false
    }
  },
  {
    path: "/add-record",
    name: "AddRecord",
    component: () => import("@/views-app/record/AddRecords.vue"),
    meta: {
      title: "LedgerAddRecord"
    }
  },
  {
    path: "/edit-record/:id",
    name: "EditRecord",
    component: () => import("@/views-app/record/EditRecords.vue"),
    meta: {
      title: "LedgerEditRecord"
    }
  },
  {
    path: "/record-list",
    name: "RecordList",
    component: () => import("@/views-app/record/RecordList.vue"),
    meta: {
      title: "LedgerRecordHistory"
    }
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("@/views-app/service/Services.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/credit",
    name: "Credit",
    component: () => import("@/views-app/credit/Credit.vue"),
    meta: {
      title: "CreditLine"
    }
  },
  {
    path: "/loan",
    name: "Loan",
    component: () => import("@/views-app/loan/Loan.vue"),
    meta: {
      title: "LoanInformation"
    }
  },
  {
    path: "/loan-exceed-limit",
    name: "LoanAmountExceedLimitError",
    component: () => import("@/views-app/loan/LoanAmountExceedLimitError.vue"),
    meta: {
      title: "LoanInformation"
    }
  },
  {
    path: "/enter-loan-info",
    name: "EnterLoanInfo",
    component: () => import("@/views-app/loan/EnterLoanInfo.vue"),
    meta: {
      title: "LoanForm"
    }
  },
  {
    path: "/enter-loan-amount",
    name: "EnterLoanAmount",
    component: () => import("@/views-app/loan/EnterLoanAmount.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/services-apply-more-channel",
    name: "ApplyMoreChannel",
    component: () => import("@/views-app/service/ApplyMoreChannel.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views-app/Settings.vue"),
    meta: {
      title: "Setting"
    }
  },
  {
    path: "/language",
    name: "LanguageSelect",
    component: () => import("@/views-app/LanguageSelect.vue"),
    meta: {
      title: "SettingLanguage"
    }
  },
  {
    path: "/support",
    name: "Support",
    component: () => import("@/views-app/Support.vue"),
    meta: {
      title: "SettingFeedback"
    }
  },
  {
    path: "/manage-settlement",
    name: "ManageSettlement",
    component: () => import("@/views-app/service/ManageSettlement.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/manage-channels",
    name: "ManageChannels",
    component: () => import("@/views-app/service/ManageChannels.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/qrcode",
    name: "Qrcode",
    component: () => import("@/views-app/Qrcode.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("@/views-app/Scan.vue"),
    meta: {
      title: ""
    }
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views-app/Profile.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/select-bank",
    name: "SelectBank",
    component: () => import("@/views-app/SelectBank.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/select-bank/:id",
    name: "BankDetails",
    component: () => import("@/views-app/BankDetails.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views-app/Search.vue"),
    meta: {
      title: ""
    }
  },

  {
    path: "/landing-page",
    name: "LandingPage",
    component: () => import("@/views-app/authentication/LandingPage.vue"),
    meta: {
      title: "LoginPage"
    }
  },
  {
    path: "/login-page",
    name: "LoginPage",
    component: () => import("@/views-app/authentication/LoginPage.vue"),
    meta: {
      title: "SigninMobile"
    }
  },
  {
    path: "/personal-question/:id",
    name: "PersonalQuestion",
    component: () => import("@/views-app/authentication/PersonalQuestion.vue"),
    meta: {
      title: "PersonalQuestion",
      allowBack: false
    }
  },
  {
    path: "/enter-otp-sp",
    name: "EnterOtp",
    component: () => import("@/views-app/authentication/EnterOTP.vue"),
    meta: {
      title: "SigninVerify"
    }
  },
  {
    path: "/verified-first-time",
    name: "VerifiedFirstTime",
    component: () =>
      import("@/views-app/authentication/VerifiedFirstTimeLogin.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/create-password-sp",
    name: "CreatePasswordSP",
    component: () => import("@/views-app/authentication/CreatePassword.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/enter-password-sp",
    name: "EnterPasswordSP",
    component: () => import("@/views-app/authentication/EnterPassword.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/forgot-password-sp",
    name: "ForgotPasswordSP",
    component: () => import("@/views-app/authentication/ForgotPassword.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/reset-password-sp",
    name: "ResetPasswordSP",
    component: () => import("@/views-app/authentication/ResetPassword.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/daily-fortune-prepare",
    name: "DailyFortunePrepare",
    component: () => import("@/views-app/fortune/DailyFortunePrepare.vue"),
    meta: {
      title: "FortuneTellingLanding"
    }
  },
  {
    path: "/daily-fortune-question/:id",
    name: "DailyFortuneQuestion",
    component: () => import("@/views-app/fortune/DailyFortuneQuestion.vue"),
    meta: {
      title: "FortuneTellingQuestion"
    }
  },
  {
    path: "/daily-fortune-loading",
    name: "DailyFortuneLoading",
    component: () => import("@/views-app/fortune/DailyFortuneLoading.vue"),
    meta: {
      title: "FortuneTellingCalculating",
      allowBack: false
    }
  },
  {
    path: "/daily-fortune-result",
    name: "DailyFortuneResult",
    component: () => import("@/views-app/fortune/DailyFortuneResult.vue"),
    meta: {
      title: "FortuneTellingResult",
      allowBack: false
    }
  },
  {
    path: "/master-profile/:id",
    name: "MasterProfile",
    component: () => import("@/views-app/fortune/MasterProfile.vue"),
    meta: {
      title: "FortuneTellingMasterProfile",
      allowBack: true
    }
  }
];

const ArticleArr = [
  {
    path: "/article",
    name: "ArticleExternal",
    component: () => import("@/article/ArticleExternal.vue"),
    meta: {
      title: "ArticleContent"
    }
  },
  {
    path: "/article-internal",
    name: "ArticleInternal",
    component: () => import("@/article/ArticleInternal.vue"),
    meta: {
      title: ""
    }
  }
];

const ErrorRouteArr = [
  {
    path: "/*",
    name: "PageNotFound",
    component: () => import("@/views-app/404.vue"),
    meta: {
      title: "PageNotFound"
    }
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: () => import("@/views-app/500.vue"),
    meta: {
      title: "ServerError"
    }
  },
  {
    path: "/no-connection",
    name: "NoConnectionError",
    component: () => import("@/views-app/NoConnection.vue"),
    meta: {
      title: "ServerError"
    }
  }
];

const router = new Router({
  mode: process.env.VUE_APP_ROUTEMODE,
  base: process.env.BASE_URL,
  routes: routeArr.concat(AppRouteArr, ArticleArr, ErrorRouteArr),
  redirectToHome(message) {
    this.push({ name: "Welcome" });
  },
  redirectToLoginView(message) {
    this.push({ name: "Login" });
  }
});

router.beforeEach((to, from, next) => {
  // if no connection- goes to noConnectionError page
  if (!navigator.onLine && to.name !== "NoConnectionError") {
    next({ name: "NoConnectionError" });
    return false;
  }
  // these pages can enter directly without logined
  // if (
  //   !store.state.logInWithPassword &&
  //   ![
  //     "LandingPage",
  //     "EnterOtp",
  //     "VerifiedFirstTime",
  //     "CreatePasswordSP",
  //     "EnterPasswordSP",
  //     "ForgotPasswordSP",
  //     "ResetPasswordSP",
  //     "PageNotFound",
  //     "ServerError"
  //   ].includes(to.name)
  // ) {
  //   next({ name: "LandingPage" });
  //   return false;
  // }

  // These page can go without OTP Verified
  // if (
  //   !store.state.OTPVerified &&
  //   !["LandingPage", "EnterOtp", "Admin"].includes(to.name)
  // ) {
  //   next({ name: "LandingPage" });
  //   return false;
  // }
  analytics.setCurrentScreen(to.meta.title);
  analytics.setCurrentScreen(to.fullPath);
  next();
  // disable back button
  let allowBack = true;
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack;
  }
  if (!allowBack) {
    history.pushState(null, null, location.href);
  }
  store.dispatch("updateAppSetting", { allowBack: allowBack });
});

export default router;
