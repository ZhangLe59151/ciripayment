function analyticsWithCondition(func) {
  if (window.location.protocol === "file:" && window.cordova) {
    func();
  }
}

/* eslint-disable no-undef */
export default {
  logEvent(event, params) {
    console.log("logEvent:", event, "-", params);
    analyticsWithCondition(() => {
      cordova.plugins.firebase.analytics.logEvent(event, params);
    });
  },
  setUserId(id) {
    console.log("setUserId:", id);
    analyticsWithCondition(() => {
      cordova.plugins.firebase.analytics.setUserId(id);
    });
  },
  setUserProperty(name, value) {
    console.log("setUserProperty:", name, "-", value);
    analyticsWithCondition(() => {
      cordova.plugins.firebase.analytics.setUserProperty(name, value);
    });
  },
  setCurrentScreen(name) {
    console.log("setCurrentScreens:", name);
    analyticsWithCondition(() => {
      cordova.plugins.firebase.analytics.setCurrentScreen(name);
    });
  }
};