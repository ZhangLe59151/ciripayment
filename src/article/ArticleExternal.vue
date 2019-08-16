<template>
  <section class="article-section">
    <app-common-header v-if="$store.state.deviceType === 'APP'"/>
    <!-- <div class="article">
      <div class="title">"พระจูเลียน" รับเสพเมถุน ขอโทษคนไทย เตรียมสึกพรุ่งนี้</div>
      <div class="date">12 July 2019</div>

      <img src="@/assets/imgs/rectangle.png">

      <div
        class="cnt"
      >Volatile Dow Jones hedge fund rates bonds fluctuate bear capital district. Securities passively taxpayer funds market dividends value financial health quarterly. Index investment performance interest potential taxpayer retirement dividends. Government credit comodity receive dividends economy. Capital exchange NYSE funds potential government federal dividends term district established economy treasury. Potential interest rate Dow Jones financial health bills NYSE exchange index funds established exchange traded funds municipal managed comodity bonds. Public notes volatile Moody's credit interest funds Fitch economy retirement.</div>
    </div>-->
    <!-- <van-button type="primary" text="显示遮罩层" @click="showOverlay = true"/> -->

    <van-overlay :show="loadingIframe" :class="{'showOverlay': loadingIframe}"></van-overlay>
    <van-loading type="spinner" color="#ffffff" class="loading" v-show="loadingIframe"/>
    <iframe id="show-iframe" class="article-iframe" :src="this.$route.query.url"/>
  </section>
</template>

<script>
import AppCommonHeader from "@/components/AppCommonHeader";

export default {
  data() {
    return {
      loadingIframe: true
    };
  },
  components: {
    AppCommonHeader
  },
  methods: {
    loadPageData() {
      const vm = this;
      const iframe = document.querySelector("#show-iframe");
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          // after iframe loading finished
          console.log("iframe loaded!");
          this.loadingIframe = false;
        });
      } else {
        iframe.onload = function() {
          // iframe加载完毕以后执行操作
          console.log("iframe loaded!!");
          vm.loadingIframe = false;
        };
      }
    }
  },
  mounted() {
    const me = this;
    this.loadPageData();
  }
};
</script>

<style lang="scss" scoped>
.article-section {
  overflow-x: hidden;
}
.article-iframe {
  height: calc(100vh - 44px);
  width: 100%;
  border: none;
}

.showOverlay {
  z-index: 8888 !important;
  display: block !important;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
  z-index: 9999;
}

.article {
  margin: 16px;
  img {
    height: 160px;
    width: 100%;
  }
  .title {
    font-weight: bold;
    font-size: 24px;
    color: #2f3941;
    letter-spacing: 0;
  }

  .date {
    font-size: 16px;
    color: #68737d;
    letter-spacing: 0;
    line-height: 22px;
    margin: 10px 0 20px;
  }

  .cnt {
    margin-top: 20px;
    font-size: 16px;
    color: #68737d;
    letter-spacing: 0;
    line-height: 22px;
  }
}
</style>
