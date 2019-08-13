<template>
  <div
    class="bank-box"
    v-if="!haveBankAccount"
  >
    <div class="des">Set up your bank account for withdrawal.</div>
    <van-button
      type="default"
      size="small"
      class="link-btn"
      @click="handleLinkBankAccount"
    >Link Bank Account</van-button>
  </div>

  <div
    class="bank-box"
    v-else
  >
    <img :src="compareImgUrl(bankInfo.bankCode)">
    <div class="acc-info">
      <div>{{bankInfo.bankName}}</div>
      <div>
        <span>
          Savings Account
        </span>
        <span>
          {{bankAccValue}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      imgList: {
        bank00: require("@/assets/imgs/bank00.png"),
        bank01: require("@/assets/imgs/bank01.png"),
        bank02: require("@/assets/imgs/bank02.png"),
        bank03: require("@/assets/imgs/bank03.png"),
        bank04: require("@/assets/imgs/bank04.png")
      }
    };
  },
  computed: {
    ...mapState({
      bankInfo: state => state.merchantProfile.bankAccountVoList[0]
    }),

    bankAccValue() {
      return this.bankInfo.accountNo
        ? "***********" +
            this.bankInfo.accountNo.slice(this.bankInfo.accountNo.length - 4)
        : "";
    },
    haveBankAccount() {
      return this.bankInfo.accountNo !== "";
    }
  },
  methods: {
    handleLinkBankAccount() {
      this.$router.push({ name: "SelectBank" });
    },
    compareImgUrl(id) {
      return this.imgList[`bank0${id}`];
    }
  }
};
</script>

<style lang="scss" scoped>
.bank-box {
  background: #ffffff;
  box-shadow: 0 2px 8px -4px rgba(4, 43, 68, 0.2);
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;

  .des {
    font-size: 14px;
    color: #2f3941;
    letter-spacing: 0;
  }

  .link-btn {
    width: 100%;
    margin-top: 10px;
    border: 1px solid #FF8600;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    font-size: 14px;
    color: #FF8600;
    letter-spacing: 0;
    text-align: center;
    line-height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
  }

  .acc-info {
    display: inline-block;
    width: calc(100% - 40px);
    margin-left: 6px;

    > div {
      &:first-child {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
        line-height: 12px;
        font-weight: bold;
      }
      &:last-child {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
        line-height: 12px;
        position: relative;
        top: 4px;

        > span:last-child {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
