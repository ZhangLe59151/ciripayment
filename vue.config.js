module.exports = {
  devServer: {
    // proxy: "https://mvp.silot.tech/"
    proxy: "http://13.251.81.240:15005/"
    // proxy: "http://localhost:15005/"
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  publicPath: "",
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  runtimeCompiler: true
};
