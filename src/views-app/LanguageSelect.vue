<template>
  <div class="language-select">
    English
    <van-checkbox v-model="checked" checked-color="#07c160"/>
  </div>
</template>

<script>
export default {
  name: "LanguageSelect",
  data() {
    return {
     checked: true,
    };
  },
  methods: {
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
.language-select {
  margin: 10px 0;
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
