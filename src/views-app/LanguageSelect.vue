<template>
  <div class="language-select">
    <app-common-header title="Language" />
    <div class="language">
      <div class="title">English</div>
      <van-checkbox
        class="icon"
        v-model="checked"
        checked-color="#07c160"
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
  margin: 0 0 0 0;
  background-color: #c8c8c8;
  min-height: 100vh;
}

.language {
  height: 50px;
  line-height: 50px;
  margin: 0 0 0 0;
  background-color: white;
  border-bottom-color: #87929d;
  border-bottom-width: 2px;
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
