<template>
  <div class="app-support">
    <app-common-header title="Support" />
    <div class="feedback">
      Got feedback or 
      experiencing problems?
      <div>Drop us a message and our customer
          support representatives will be happy to
          assist you!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      profileDialog: false,
      showKeyboard: false,
      value: "",
      login: true
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.app-support {
  margin: 0 0 0 0;
  position: relative;

  .dialog-title {
    font-size: 24px;
    color: #000000;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .van-cell-group {
    margin-top: 20px;
  }
  .dialog-des {
    font-size: 16px;
    color: #000000;
    margin-bottom: 20px;
  }

  .dialog-tip {
    font-size: 14px;
    color: #000000;
    margin-bottom: 20px;
  }
  .van-number-keyboard {
    z-index: 3001 !important;
  }
}

.setting_title {
  margin: 16px 16px 4px 16px;
  font-size: 12px;
  font-weight: bolder;
  color: #2F3941;
}
</style>

<style lang="scss" >
.app-setting-list {
  .van-password-input__security {
    height: 40px;

    li {
      font-size: 14px;
      color: #87929d;
      letter-spacing: 0;
      text-align: center;
      border: 1px solid #c8c8c8;
      height: 40px;
      line-height: 40px;
      width: 40px;
      flex: none;
      margin-right: 10px;
      border-radius: 4px;
    }
  }

  .van-password-input__security::after {
    border: none;
  }
}
</style>
