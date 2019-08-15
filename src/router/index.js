import Vue from "vue";
import Router from "vue-router";
import store from "../store";

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
    component: () => import("@/views-app/Sic.vue")
  },
  {
    path: "/subsic",
    name: "SubSIC",
    component: () => import("@/views-app/SubSic.vue")
  },
  {
    path: "/mcc",
    name: "MCC",
    component: () => import("@/views-app/Mcc.vue")
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
    component: () => import("@/views-app/Records.vue")
  },
  {
    path: "/addrecord",
    name: "Records",
    component: () => import("@/views-app/AddRecords.vue")
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("@/views-app/Services.vue")
  },
  {
    path: "/loan",
    name: "Loan",
    component: () => import("@/views-app/Loan.vue")
  },
  {
<<<<<<< HEAD
    path: "/record-list",
    name: "RecordList",
    component: () => import("@/views-app/RecordList.vue")
=======
    path: "/enter-loan-info",
    name: "EnterLoanInfo",
    component: () => import("@/views-app/EnterLoanInfo.vue")
  },
  {
    path: "/enter-loan-amount",
    name: "EnterLoanAmount",
    component: () => import("@/views-app/EnterLoanAmount.vue")
>>>>>>> 7e617efbca4ffdf353081ed361bca32ea2aec63a
  },
  {
    path: "/services-apply-more-channel",
    name: "ApplyMoreChannel",
    component: () => import("@/views-app/ApplyMoreChannel.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views-app/Settings.vue")
  },
  {
    path: "/manage-settlement",
    name: "ManageSettlement",
    component: () => import("@/views-app/ManageSettlement.vue")
  },
  {
    path: "/manage-channels",
    name: "ManageChannels",
    component: () => import("@/views-app/ManageChannels.vue")
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
    component: () => import("@/views-app/LandingPage.vue")
  },
  {
    path: "/enter-otp-sp",
    name: "EnterOtp",
    component: () => import("@/views-app/EnterOTP.vue")
  },
  {
    path: "/verified-first-time",
    name: "VerifiedFirstTime",
    component: () => import("@/views-app/VerifiedFirstTimeLogin.vue")
  },
  {
    path: "/create-password-sp",
    name: "CreatePasswordSP",
    component: () => import("@/views-app/CreatePassword.vue")
  },
  {
    path: "/enter-password-sp",
    name: "EnterPasswordSP",
    component: () => import("@/views-app/EnterPassword.vue")
  },
  {
    path: "/forgot-password-sp",
    name: "ForgotPasswordSP",
    component: () => import("@/views-app/ForgotPassword.vue")
  },
  {
    path: "/reset-password-sp",
    name: "ResetPasswordSP",
    component: () => import("@/views-app/ResetPassword.vue")
  },
  {
    path: "/fortunetelling-result",
    name: "FortunetellingResult",
    component: () => import("@/views-app/FortunetellingResult.vue")
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
  routes: routeArr.concat(AppRouteArr, ErrorRouteArr),
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
  if (
    !store.state.OTPVerified &&
    !["LandingPage", "EnterOtp", "Admin"].includes(to.name)
  ) {
    next({ name: "LandingPage" });
    return false;
  }
  next();
});

export default router;
