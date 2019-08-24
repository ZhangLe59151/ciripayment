module.exports = {
  devServer: {
    // proxy: "http://localhost:15005/"
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
