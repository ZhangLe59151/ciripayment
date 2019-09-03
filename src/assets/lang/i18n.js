import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: process.env.VUE_APP_LANG,
  messages: {
    en: require("@/assets/lang/en.json"),
    th: require("@/assets/lang/th.json")
  }
});

export default i18n;
