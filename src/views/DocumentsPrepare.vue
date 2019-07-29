<template>
  <div class="doc-prepare">
    <van-nav-bar
      title
      right-text="Cancel"
      @click-right="handleCancel"
      :border="false"
    />

    <div class="title">Mobile number verified!</div>
    <div class="list-desc">Please have the following documents ready for Business Account Opening:</div>
    <div class="list-item">
      <span class="list-bg">1</span> National ID
    </div>
    <div class="list-item">
      <span class="list-bg">2</span> Business Registration (if any)
    </div>

    <div class="cnt">
      <div class="doc-tips">The application will take 5 – 10 minutes to complete.</div>
      <div class="tips app-form">
        <div class="desc">Fill up the digital application form.</div>
      </div>
      <div class="tips app-document">
        <div class="desc">Upload the necessary documents.</div>
      </div>
      <div class="tips app-review">
        <div class="desc">Review your application before submission.</div>
      </div>
      <!--
      <div
        class="tips"
        style="margin-top: 20px;"
        v-for="item in imgs"
        :key="item.url"
      >
        <img
          :src="item.url"
          alt=""
        >
        <div class="desc">{{item.des}}</div>
      </div>
      -->
    </div>
    <van-button
      size="large"
      class="bottom-btn"
      @click="handleNext"
      style="margin-bottom:100px;"
    >
      I'm Ready
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.doc-prepare {
  text-align: center;

  .title {
    font-size: 27px;
    padding: 20px;
  }
  .list-desc {
    font-size: 15px;
    width: 85%;
    margin-left: 10%;
    text-align: left;
    margin-bottom: 10px;
  }
  .list-item {
    font-size: 15px;
    line-height: 15px;
    height: 15px;
    width: 80%;
    margin-left: 10%;
    text-align: left;
    margin-bottom: 15px;

    .list-bg {
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      line-height: 20px;
      margin-right: 10px;
      font-size: 10px;
      color: #fff;
      width: 20px;
      height: 20px;
      background: #26c485;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
    }
  }

  .cnt {
    margin: 20px 10% 0;
    padding: 28px;
    background-color: #f2f2f2;
    border-color: #979797;
    border-radius: 8px;
    height: auto;
    min-height: 200px;
    .subtitle {
      font-size: 15px;
      color: #053c5e;
    }

    .doc-tips {
      font-size: 13px;
      color: #053c5e;
    }
    .tips {
      margin-top: 20px;
      text-align: left;
      width: 100%;
      .desc {
        margin-left: 35px;
        font-size: 13px;
        width: 80%;
        vertical-align: middle;
      }
      &.app-form {
        background-image: url("../assets/imgs/icon_5.png");
        background-position: 0 center;
        background-size: 20px auto;
        background-repeat: no-repeat;
      }
      &.app-document {
        background-image: url("../assets/imgs/icon_2.png");
        background-position: 0 center;
        background-size: 20px auto;
        background-repeat: no-repeat;
      }
      &.app-review {
        background-image: url("../assets/imgs/icon_3.png");
        background-position: 0 center;
        background-size: 20px auto;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>

<script>
// @ is an alias to /src
import icon5 from "@/assets/imgs/icon_5.png";
import icon2 from "@/assets/imgs/icon_2.png";
import icon3 from "@/assets/imgs/icon_3.png";
import util from "@/util.js";

export default {
  name: "documents",
  data() {
    return {
      active: 0,
      icon5: icon5,
      icon2: icon2,
      icon3: icon3,
      ls: window.localStorage,
      imgs: [
        {
          url: icon5,
          des: "Fill up the digital application form."
        },
        {
          url: icon2,
          des:
            "Upload the necessary documents. Please ensure you have a stable internet connection."
        },
        {
          url: icon3,
          des: "Review your application before submission."
        }
      ]
    };
  },
  methods: {
    handleCancel() {
      this.$store.commit("ClearForm");
      util.redirectToHome(this);
    },
    handleNext() {
      this.$router.push({ name: "EnterInfo" });
    }
  }
};
</script>
