import moment from "moment-timezone";
import { find } from "lodash";
export default {
  byteToMb: numBytes => {
    return Number.parseFloat(numBytes / 1024 / 1024).toFixed(2);
  },
  redirectToHome(vm, message) {
    vm.$router.push({ name: "Welcome" });
    if (message) {
      vm.$notify(message);
    }
  },
  redirectToLoginView(vm, message) {
    vm.$router.push({ name: "Login" });
    if (message) {
      vm.$notify(message);
    }
  },
  removeCookies(key, domain, path) {
    document.cookie =
      encodeURIComponent(key) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (domain ? "; domain=" + domain : "") +
      (path ? "; path=" + path : "; path=/");
  },
  convertUTCTimeToLocalTime(dateTime) {
    if (!dateTime) {
      return "-";
    }
    return moment(dateTime)
      .tz("Asia/Singapore")
      .format("MMMM D YYYY hh:mmA");
  },
  convertToCategoryName(id, list, i) {
    const arr = [];
    for (const value of Object.values(list)) {
      arr.push.apply(arr, value);
    }

    const item = find(arr, { id: id });

    if (item) {
      return item.name + (i === 0 ? " >" : "");
    }
    return "";
  },
  fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
};
