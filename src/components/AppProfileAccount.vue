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
    >Update Profile</van-button>
  </div>

  <div
    class="bank-box"
    v-else
  >
    <img :src="require('@/assets/imgs/ico_bank.png')">
    <div class="acc-info">
      <div>ABC Bank</div>
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
export default {
  props: {
    bankAccount: {
      default: "",
      type: String,
      required: true
    }
  },
  computed: {
    bankAccValue() {
      return this.bankAccount
        ? "***********" + this.bankAccount.slice(this.bankAccount.length - 4)
        : "";
    },
    haveBankAccount() {
      return this.bankAccount !== "";
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
    border: 1px solid #053c5e;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    font-size: 14px;
    color: #053c5e;
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
