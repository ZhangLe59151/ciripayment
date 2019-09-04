<template>
  <div class="language-select">
    <app-common-header title="Language" />

    <div class="language">

      <van-radio-group v-model="checked">
        <div class="radio">
          <div class="title">{{$t("Language.en")}}</div>
          <van-radio
            class="icon"
            name="en"
            checked-color="#04A777"
          />
        </div>

        <div class="radio">
          <div class="title">{{$t("Language.th")}}</div>
          <van-radio
            class="icon"
            name="th"
            checked-color="#04A777"
          />
        </div>

      </van-radio-group>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LanguageSelect",
  data() {
    return {
      checked: ""
    };
  },
  computed: {
    ...mapState({
      lang: state => state.settings.lang
    })
  },
  watch: {
    checked: {
      handler(val, oldVal) {
        if (!val) {
          this.checked = this.lang;
        }
        this.$store.commit("UpdateSettings", { lang: val });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.language-select {
  margin: 0;
  background-color: #e9ebed;
  min-height: 100vh;
}

.language {
  height: auto;
  margin: 7px 0 0 0;
}

.radio {
  height: 50px;
  line-height: 50px;
  background-color: white;
  margin: 1px 0 0 0;
  position: relative;

  .title {
    position: absolute;
    left: 16px;
    font-size: 16px;
  }

  .icon {
    position: absolute;
    right: 16px;
    top: -8px;
  }
}
</style>
