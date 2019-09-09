<template>
  <div class="appSocialSignIn">

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppSocialSignIn",

  props: {
    master: {
      default() {
        return {};
      },
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    }),
    subtitle() {
      return this.$tc(
        "FortuneTelling.likeDes",
        this.master.like === 1 ? 1 : 2,
        { n: parseInt(this.master.likeCount / 10) * 10 }
      );
    }
  },

  methods: {
    handleViewMasterClick() {
      this.$store.commit(
        "SaveFortuneInfo",
        Object.assign({}, this.fortuneInfo, { selectedMaster: this.master })
      );
      this.$router.push({
        name: "MasterProfile",
        params: { id: this.master.id },
        query: { subtitle: this.subtitle }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appSocialSignIn {
  height: 200px;
  width: 100%;
}
</style>
