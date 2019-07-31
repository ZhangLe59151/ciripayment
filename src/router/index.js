import Vue from "vue";
import Router from "vue-router";

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
    component: () => import("@/views-standard-product/Home.vue")
  },
  {
    path: "/qrcode",
    name: "Qrcode",
    component: () => import("@/views-standard-product/Qrcode.vue")
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("@/views-standard-product/Scan.vue")
  },
  {
    path: "/settings/profile",
    name: "SettingsProfile",
    component: () => import("@/views-standard-product/SettingsProfile.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views-standard-product/Settings.vue")
  },

  // Standard Product
  {
    path: "/landing-page",
    name: "LandingPage",
    component: () => import("@/views-standard-product/LandingPage.vue")
  },
  {
    path: "/enter-otp-sp",
    name: "EnterOtp",
    component: () => import("@/views-standard-product/EnterOTP.vue")
  },
  {
    path: "/verified-first-time",
    name: "VerifiedFirstTime",
    component: () =>
      import("@/views-standard-product/VerifiedFirstTimeLogin.vue")
  },
  {
    path: "/create-password-sp",
    name: "CreatePasswordSP",
    component: () => import("@/views-standard-product/CreatePassword.vue")
  },
  {
    path: "/enter-password-sp",
    name: "EnterPasswordSP",
    component: () => import("@/views-standard-product/EnterPassword.vue")
  },
  {
    path: "/forgot-password-sp",
    name: "ForgotPasswordSP",
    component: () => import("@/views-standard-product/ForgotPassword.vue")
  },
  {
    path: "/reset-password-sp",
    name: "ResetPasswordSP",
    component: () => import("@/views-standard-product/ResetPassword.vue")
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
  // the pages can enter directly without logined
  if (["PageNotFound", "ServerError"].includes(to.name)) {
    next();
    return false;
  }
  next();
});

export default router;
