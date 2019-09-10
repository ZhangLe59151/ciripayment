import Vue from "vue";
import Router from "vue-router";
import analytics from "../firebase/analytics";

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
      title: "SettingTnC"
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
    path: "/social",
    name: "SocialPage",
    component: () => import("@/views-app/social/SocialPage.vue"),
    meta: {
      title: "SocialPage"
    }
  },
  {
    path: "/socialHome",
    name: "SocialHome",
    component: () => import("@/views-app/social/SocialHomePage.vue"),
    meta: {
      title: "SocialHome"
    }
  },
  {
    path: "/socialMerchantDetail",
    name: "SocialMerchantDetailPage",
    component: () => import("@/views-app/social/SocialMerchantDetailPage.vue"),
    meta: {
      title: "SocialMerchantDetailPage"
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
    path: "/loan-result/:id",
    name: "LoanApplicationResult",
    component: () => import("@/views-app/loan/LoanApplicationResult.vue"),
    meta: {
      title: "LoanResult"
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
    component: () => import("@/views-app/article/ArticleExternal.vue"),
    meta: {
      title: "ArticleContent"
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
  // GA for screen
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
