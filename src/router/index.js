import Vue from "vue";
import Router from "vue-router";
// import store from "../store";

Vue.use(Router);

const routeArr = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/enter-info",
    name: "EnterInfo",
    component: () => import("@/views-app/EnterInfo.vue")
  },

  {
    path: "/sic",
    name: "SIC",
    component: () => import("@/views-app/loan/Sic.vue")
  },
  {
    path: "/subsic",
    name: "SubSIC",
    component: () => import("@/views-app/loan/SubSic.vue")
  },
  {
    path: "/mcc",
    name: "MCC",
    component: () => import("@/views-app/loan/Mcc.vue")
  },
  {
    path: "/province",
    name: "Province",
    component: () => import("@/views-app/Province.vue")
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views-app/Success.vue")
  },
  {
    path: "/view-application",
    name: "ViewApplication",
    component: () => import("@/views-app/ViewApplication.vue")
  },
  {
    path: "/tc",
    name: "TermsAndConditions",
    component: () => import("@/views-app/TermsAndConditions.vue")
  },
  {
    path: "/preview-info",
    name: "PreviewInfo",
    component: () => import("@/views-app/PreviewInfo.vue")
  },

  {
    path: "/services-info",
    name: "ServicesInfo",
    component: () => import("@/views-app/ServicesInfo.vue")
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: () => import("@/views-app/UpdateProfile.vue")
  },
  // Other Area
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views-app/Admin.vue")
  }
];

const AppRouteArr = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views-app/Home.vue")
  },
  {
    path: "/records",
    name: "Records",
    component: () => import("@/views-app/record/Records.vue")
  },
  {
    path: "/add-record",
    name: "AddRecord",
    component: () => import("@/views-app/record/AddRecords.vue")
  },
  {
    path: "/edit-record/:id",
    name: "EditRecord",
    component: () => import("@/views-app/record/EditRecords.vue")
  },
  {
    path: "/record-list",
    name: "RecordList",
    component: () => import("@/views-app/record/RecordList.vue")
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("@/views-app/service/Services.vue")
  },
  {
    path: "/credit",
    name: "Credit",
    component: () => import("@/views-app/credit/Credit.vue")
  },
  {
    path: "/loan",
    name: "Loan",
    component: () => import("@/views-app/loan/Loan.vue")
  },

  {
    path: "/enter-loan-info",
    name: "EnterLoanInfo",
    component: () => import("@/views-app/loan/EnterLoanInfo.vue")
  },
  {
    path: "/enter-loan-amount",
    name: "EnterLoanAmount",
    component: () => import("@/views-app/loan/EnterLoanAmount.vue")
  },
  {
    path: "/services-apply-more-channel",
    name: "ApplyMoreChannel",
    component: () => import("@/views-app/service/ApplyMoreChannel.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views-app/Settings.vue")
  },
  {
    path: "/language",
    name: "LanguageSelect",
    component: () => import("@/views-app/LanguageSelect.vue")
  },
  {
    path: "/support",
    name: "Support",
    component: () => import("@/views-app/Support.vue")
  },
  {
    path: "/manage-settlement",
    name: "ManageSettlement",
    component: () => import("@/views-app/service/ManageSettlement.vue")
  },
  {
    path: "/manage-channels",
    name: "ManageChannels",
    component: () => import("@/views-app/service/ManageChannels.vue")
  },
  {
    path: "/qrcode",
    name: "Qrcode",
    component: () => import("@/views-app/Qrcode.vue")
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("@/views-app/Scan.vue")
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views-app/Profile.vue")
  },
  {
    path: "/select-bank",
    name: "SelectBank",
    component: () => import("@/views-app/SelectBank.vue")
  },
  {
    path: "/select-bank/:id",
    name: "BankDetails",
    component: () => import("@/views-app/BankDetails.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views-app/Search.vue")
  },

  {
    path: "/landing-page",
    name: "LandingPage",
    component: () => import("@/views-app/authentication/LandingPage.vue")
  },
  {
    path: "/enter-otp-sp",
    name: "EnterOtp",
    component: () => import("@/views-app/authentication/EnterOTP.vue")
  },
  {
    path: "/verified-first-time",
    name: "VerifiedFirstTime",
    component: () =>
      import("@/views-app/authentication/VerifiedFirstTimeLogin.vue")
  },
  {
    path: "/create-password-sp",
    name: "CreatePasswordSP",
    component: () => import("@/views-app/authentication/CreatePassword.vue")
  },
  {
    path: "/enter-password-sp",
    name: "EnterPasswordSP",
    component: () => import("@/views-app/authentication/EnterPassword.vue")
  },
  {
    path: "/forgot-password-sp",
    name: "ForgotPasswordSP",
    component: () => import("@/views-app/authentication/ForgotPassword.vue")
  },
  {
    path: "/reset-password-sp",
    name: "ResetPasswordSP",
    component: () => import("@/views-app/authentication/ResetPassword.vue")
  },
  {
    path: "/daily-fortune-prepare",
    name: "DailyFortunePrepare",
    component: () => import("@/views-app/fortune/DailyFortunePrepare.vue")
  },
  {
    path: "/daily-fortune-question",
    name: "DailyFortuneQuestion",
    component: () => import("@/views-app/fortune/DailyFortuneQuestion.vue")
  },
  {
    path: "/daily-fortune-loading",
    name: "DailyFortuneLoading",
    component: () => import("@/views-app/fortune/DailyFortuneLoading.vue")
  },
  {
    path: "/daily-fortune-result",
    name: "DailyFortuneResult",
    component: () => import("@/views-app/fortune/DailyFortuneResult.vue")
  },
  {
    path: "/master-profile/:id",
    name: "MasterProfile",
    component: () => import("@/views-app/fortune/MasterProfile.vue")
  }
];

const ArticleArr = [
  {
    path: "/article",
    name: "ArticleExternal",
    component: () => import("@/article/ArticleExternal.vue")
  },
  {
    path: "/article-internal",
    name: "ArticleInternal",
    component: () => import("@/article/ArticleInternal.vue")
  }
];

const ErrorRouteArr = [
  {
    path: "/*",
    name: "PageNotFound",
    component: () => import("@/views-app/404.vue")
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: () => import("@/views-app/500.vue")
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
  next();
});

export default router;
