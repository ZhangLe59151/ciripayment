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
    path: "/choose-service",
    name: "ChooseService",
    component: () => import("@/views/ChooseService.vue")
  },
  {
    path: "/select-payment-channels",
    name: "SelectPaymentChannels",
    component: () => import("@/views/SelectPaymentChannels.vue")
  },
  {
    path: "/account-question",
    name: "HaveAccount",
    component: () => import("@/views/HaveAccount.vue")
  },
  {
    path: "/biz-reg-question",
    name: "BusinessRegister",
    component: () => import("@/views/BusinessRegister.vue")
  },
  {
    path: "/send-otp",
    name: "SendOtp",
    component: () => import("@/views/SendOtp.vue")
  },
  {
    path: "/verify-otp",
    name: "VerifyOtp",
    component: () => import("@/views/VerifyOtp.vue")
  },
  {
    path: "/documents",
    name: "DocumentsPrepare",
    component: () => import("@/views/DocumentsPrepare.vue")
  },
  {
    path: "/enter-info",
    name: "EnterInfo",
    component: () => import("@/views/EnterInfo.vue")
  },
  {
    path: "/services-info",
    name: "ServicesInfo",
    component: () => import("@/views/ServicesInfo.vue")
  },
  {
    path: "/upload-info",
    name: "UploadInfo",
    component: () => import("@/views/UploadInfo.vue")
  },
  {
    path: "/preview-info",
    name: "PreviewInfo",
    component: () => import("@/views/PreviewInfo.vue")
  },
  {
    path: "/sic",
    name: "SIC",
    component: () => import("@/views/Sic.vue")
  },
  {
    path: "/subsic",
    name: "SubSIC",
    component: () => import("@/views/SubSic.vue")
  },
  {
    path: "/mcc",
    name: "MCC",
    component: () => import("@/views/Mcc.vue")
  },
  {
    path: "/province",
    name: "Province",
    component: () => import("@/views/Province.vue")
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views/Success.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginOtp.vue")
  },
  {
    path: "/verify-login",
    name: "VerifyLoginOtp",
    component: () => import("@/views/VerifyLoginOtp.vue")
  },
  {
    path: "/view-application",
    name: "ViewApplication",
    component: () => import("@/views/ViewApplication.vue")
  },
  {
    path: "/service-overview",
    name: "ServiceOverview",
    component: () => import("@/views/ServiceOverview.vue")
  },
  {
    path: "/account-login",
    name: "AccountLogin",
    component: () => import("@/views/AccountLogin.vue")
  },
  {
    path: "/payment-login",
    name: "PaymentLogin",
    component: () => import("@/views/PaymentLogin.vue")
  },
  {
    path: "/check-payment-channel",
    name: "CheckPaymentChannel",
    component: () => import("@/views/CheckPaymentChannel.vue")
  },
  {
    path: "/account-info",
    name: "AccountInfo",
    component: () => import("@/views/AccountInfo.vue")
  },
  {
    path: "/tc",
    name: "TermsAndConditions",
    component: () => import("@/views/TermsAndConditions.vue")
  },
  {
    path: "/application-success",
    name: "ApplicationSuccess",
    component: () => import("@/views/ApplicationSuccess.vue")
  },
  // Merchant Area
  {
    path: "/merchant-portal",
    name: "MerchantPortal",
    component: () => import("@/views-mp/Portal.vue")
  },
  {
    path: "/merchant-login",
    name: "MerchantLogin",
    component: () => import("@/views-mp/MerchantLogin.vue")
  },
  {
    path: "/welcome-guide",
    name: "WelcomeGuide",
    component: () => import("@/views-mp/WelcomeGuide.vue")
  },
  {
    path: "/create-password",
    name: "CreatePassword",
    component: () => import("@/views-mp/CreatePassword.vue")
  },
  // Other Area
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin.vue")
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: () => import("@/views/500.vue")
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
    path: "/services",
    name: "Services",
    component: () => import("@/views-app/Services.vue")
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

  // Standard Product
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
  }
];

const ErrorRouteArr = [
  {
    path: "/*",
    name: "PageNotFound",
    component: () => import("@/views/404.vue")
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
  if (
    !store.state.logInWithPassword &&
    ![
      "LandingPage",
      "EnterOtp",
      "VerifiedFirstTime",
      "CreatePasswordSP",
      "EnterPasswordSP",
      "ForgotPasswordSP",
      "ResetPasswordSP",
      "PageNotFound",
      "ServerError"
    ].includes(to.name)
  ) {
    next({ name: "LandingPage" });
    return false;
  }
  next();
});

export default router;
