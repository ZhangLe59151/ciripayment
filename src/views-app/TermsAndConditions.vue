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
    return {
      urltest: ""
    };
  },
  computed: {
    ...mapState({
      url: state =>
        state.deviceType === "APP"
          ? state.BaseWebUrl + "/#/tc-web"
          : location.href.replace("tc", "tc-web")
    })
  },
  mounted() {
    window.scrollTo(0, 0);
    this.urltest = this.url;
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

