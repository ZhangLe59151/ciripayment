<template>
  <div>
    <app-common-header :title="$t('Setting.tc')" />
    <iframe
      :src="url"
      class="iframeOnTc"
    />

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      url: state =>
        state.deviceType === "APP"
          ? state.WebUrl + "/tc-web"
          : location.href.replace("tc", "tc-web")
    })
  },
  mounted() {
    window.scrollTo(0, 0);
    console.log("====================================");
    console.log(this.url);
    console.log("====================================");
  }
};
</script>

<style lang="scss" scoped>
.iframeOnTc {
  height: calc(100vh - 44px);
  width: 100%;
  overflow: hidden;
  border: none;
}
</style>

