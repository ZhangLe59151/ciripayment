<template>
  <div id="app">
    <!-- use vant transition -->
    <transition :name="transitionStyle">
      <router-view :key="$route.fullpath" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
html,
body,
#app {
  position: relative;
  min-height: 100vh;
}
</style>

<script>
export default {
  data() {
    return {
      transitionStyle: "van-fade"
    };
  },
  mounted() {
    this.addElement();
    var vm = this;
    document.addEventListener(
      "backbutton",
      function(e) {
        switch (vm.$route.name) {
          case "EnterLoanInfo": {
            e.preventDefault();
            break;
          }
          case "Loan": {
            vm.$router.push({ name: "Home" });
            break;
          }
          default: {
            vm.$router.back();
            break;
          }
        }
      },
      false
    );
    // const h = document.body.scrollHeight; // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
    // window.onresize = function() {
    //   // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
    //   if (document.body.scrollHeight < h) {
    //     document.body.style.height = h;
    //   }
    // };
  },
  methods: {
    addElement() {
      // let meta = document.createElement("meta");
      // meta.content =
      //   "https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772_960_720.png";
      // meta.name = "og:image";
      // meta.property = "og:image";
      // document.getElementsByTagName("head")[0].appendChild(meta);

      const imgMeta = document.getElementById("metaImage");
      imgMeta.content =
        "https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772_960_720.png";
    }
  }
};
</script>
