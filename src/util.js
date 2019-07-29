export default {
  byteToMb: numBytes => {
    return Number.parseFloat(numBytes / 1024 / 1024).toFixed(2)
  },
  redirectToHome(vm, message) {
    vm.$router.push({ name: "Welcome" })
    if (message) {
      vm.$notify(message)
    }
  },
  redirectToLoginView(vm, message) {
    vm.$router.push({ name: "Login" })
    if (message) {
      vm.$notify(message)
    }
  },
  removeCookies(key, domain, path) {
    document.cookie =
      encodeURIComponent(key) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (domain ? "; domain=" + domain : "") +
      (path ? "; path=" + path : "; path=/")
  }
}
