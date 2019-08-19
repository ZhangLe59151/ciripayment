module.exports = {
  devServer: {
    //proxy: "http://13.251.81.240:15005/"
    proxy: process.env.VUE_APP_PROXY
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
