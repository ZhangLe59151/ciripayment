<template>
  <div class="app-success">
    <van-nav-bar
      title
      :right-text="currentView !== 3 ? 'Next >' : 'Finish'"
      right-arrow
      @click-right="handleRight"
      :border="false"
    />

    <section
      name="view-1"
      v-show="currentView === 1"
    >
      <div class="title">Bank Account Approved</div>
      <img :src="view1Img">
      <div class="des">Your business banking account has been opened. Manage it in the ABC Business e-banking portal.</div>
    </section>

    <section
      name="view-2"
      v-show="currentView === 2"
    >
      <div class="title">Ready to Receive Payment</div>
      <div class="app-success-box">
        <i
          class="el-icon-success"
          style="color: green;"
        ></i>
        <div
          class="payment-box-ctn"
          :class="{'box-center': paymentList.length === 1}"
        >
          <div
            class="payment-box"
            v-for="item in paymentList"
            :key="item.id"
          >
            <div>{{item.name}}</div>
            <img :src="item.img">
          </div>
        </div>

      </div>
      <div class="des">All approved payment channels have been enabled and are ready to receive payment.</div>
    </section>

    <section
      name="view-3"
      v-show="currentView === 3"
    >
      <div class="title">Receive Payment Instantly via QR Code</div>
      <img :src="view3Img">
      <div class="des">Simply present the QR code for your customer to scan, then key in the amount.</div>
    </section>
  </div>

</template>

<script>
export default {
  data() {
    return {
      currentView: 1,
      view1Img: require("@/assets/imgs/artboard_card.png"),
      view3Img: require("@/assets/imgs/artboard.png"),
      paymentList: [
        {
          id: "1",
          name: "Alipay",
          img: require("@/assets/imgs/ico-alipay.png")
        }
      ]
    };
  },
  methods: {
    handleRight() {
      this.currentView = (this.currentView % 3) + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-success {
  .title {
    margin-top: 30px;
    font-size: 24px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    width: 80%;
    margin-left: 10%;
  }

  img {
    width: 70%;
    margin: 20px 15%;
  }

  .des {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    width: 80%;
    margin-left: 10%;
  }

  .app-success-box {
    text-align: center;
    width: 80%;
    margin-left: 10%;
    background-color: #e3f7ff;
    padding: 10px;

    .payment-box-ctn {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      &.box-center {
        justify-content: center;
      }
      .payment-box {
        background-color: #fff;
        padding: 5px;
        margin: 4px;
        width: 80px;

        > div {
          font-size: 14px;
          color: #444444;
          letter-spacing: 0;
          text-align: center;
        }
        img {
          width: 50px;
          margin: 6px;
        }
      }
    }
  }
}
</style>
