<template>
  <div class="language-select">
    <app-common-header title="Language" />
    <div class="language">
      <div class="title">{{$t("Language.en")}}</div>
      <van-checkbox
        class="icon"
        v-model="checked"
        checked-color="#04A777"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: "LanguageSelect",
  data() {
    return {
      checked: true
    };
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.language-select {
  margin: 0;
  background-color: #e9ebed;
  min-height: 100vh;
}

.language {
  height: 50px;
  line-height: 50px;
  margin: 8px 0 0 0;
  background-color: white;
  border: 1px solid #e9ebed;
  position: relative;

  .title {
    position: absolute;
    left: 16px;
  }

  .icon {
    position: absolute;
    right: 16px;
    top: 0;
  }
}
</style>
