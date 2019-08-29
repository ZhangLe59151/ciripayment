import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: {
    en: require("@/assets/lang/en.json")
  }
});

export default i18n;