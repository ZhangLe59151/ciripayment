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
  publicPath: "", // 用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  runtimeCompiler: true // 包含运行时编译器的 Vue 构建版本
};
