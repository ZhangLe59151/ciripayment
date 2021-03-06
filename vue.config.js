module.exports = {
  pluginOptions: {
    cordovaPath: "src-cordova"
  },
  devServer: {
    // proxy: "http://52.77.225.91:14002/"
    proxy: process.env.VUE_APP_PROXY
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     // mutate config for production...
  //     config.module
  //       .rule("images")
  //       .use("image-webpack-loader")
  //       .loader("image-webpack-loader")
  //       .options({
  //         bypassOnDebug: true
  //       })
  //       .end();
  //   } else {
  //     // mutate for development...
  //   }
  // },
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  runtimeCompiler: true,
  publicPath: process.env.VUE_APP_DEVICETYPE === "APP" ? "" : "/"
};
