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
import Vue from "vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      transitionStyle: "van-fade"
    };
  },
  computed: {
    ...mapState({
      allowBack: "allowBack"
    })
  },
  mounted() {
    window.onpopstate = () => {
      if (!this.allowBack) { 
        console.log(this.allowBack);
        history.go(1) 
        } else {
          console.log(this.allowBack);
        }
    }
    var vm = this;
    document.addEventListener(
      "backbutton",
      function(e) {
        switch (vm.$route.name) {
          case "FortuneTellingResult":
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
  methods: {}
};
</script>
