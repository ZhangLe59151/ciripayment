<template>
  <section>
    <app-common-header/>
    <!-- <van-overlay :show="loadingIframe" :class="{'showOverlay': loadingIframe}"></van-overlay> -->
    <!-- <van-loading type="spinner" color="#ffffff" class="loading" v-show="loadingIframe"/> -->
    <div class="internalArticle-article" v-html="articleContent">{{articleContent}}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      articleContent: "",
      loadingIframe: true
    };
  },
  methods: {
    getArticleContent() {
      const vm = this;
      const id = vm.$route.query.id;
      this.$api.getArticleContent(id).then(res => {
        if (res.data.code === 200) {
          this.articleContent = res.data.data.content;
          this.loadingIframe = false;
        } else {
        }
      });
    }
  },
  mounted() {
    const vm = this;
    vm.getArticleContent();
  }
};
</script>

<style lang="scss">
.internalArticle-article {
  margin: 16px;
  img {
    height: 160px;
    width: 100%;
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

  div {
    margin-top: 20px;
    font-size: 16px;
    color: #68737d;
    letter-spacing: 0;
    line-height: 22px;
  }
}
</style>
