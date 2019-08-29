export var regEx = {
  phone: {
    regExp: /^(0[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{7})$/,
    thaiExp: /^(0[1-9]{1}[0-9]{8}|[1-9]{1}[0-9]{8})$/,
    sgExp: /^([1-9]{1}[0-9]{7})$/,
    minLen: 9,
    maxLen: 10
  },
  revenue: {
    regExp: /^[0-9]{1,10}$/,
    minLen: 1,
    maxLen: 10
  },
  url: {
    regExp: /^(:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
    httpExp: /http:\/\/|https:\/\//,
    minLen: 9,
    maxLen: 120
  },
  email: {
    regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    maxlen: 320
  },
  password: {
    minLen: 8,
    maxLen: 25,
    regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+=])[A-Za-z\d@$!%*?&]{8,}$/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    specialChar: /[!@#$%^\-&*)(_+=]/,
    noSpace: /^\S+$/
  },
  applicationStatus: {
    pending: "0",
    approved: "1",
    rejected: "2"
  },
  validationPatterns: {
    invalidCharset: "~`!@#$%^&*()_-+=",
    nationaldID: /[0-9]{13}/,
    bankAccount: /^[0-9A-Za-z]{5,20}$/,
    postalCode: /[0-9]{5}/,
    englishAlphabetAndThai: /^[a-z\u0E00-\u0E7F]+$/i
  }
}
