import axios from "axios"
import router from "@/router"
import { Dialog } from "vant"

// axios config
axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true
axios.defaults.headers = {
  lang: "en"
}

// http response interceptor
axios.interceptors.response.use(
  // eslint-disable-next-line space-before-function-paren
  function(response) {
    return response
  },
  // eslint-disable-next-line space-before-function-paren
  function(error) {
    if (error.response.status === 401) {
      Dialog.alert({
        message: "You have been inactive for a while. Please login again.",
        confirmButtonText: "Go to Login",
        callback: action => {
          console.log("back to login")
          window.localStorage.clear()
          router.push({ name: "Login" })
        }
      })
      return error.response
    }

    if (error.response.status === 500) {
      router.push({ name: "ServerError", query: { url: window.location.href } })
      return error.response
    }
    return Promise.reject(error)
  }
)

export default axios
