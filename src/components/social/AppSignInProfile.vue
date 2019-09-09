<template>
  <div class="appSocialSignIn">
    <div class="profile"></div>
    <van-button class="signInBtn">{{ $t('Social.signIn') }}</van-button>
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
  background-color: white;

  .profile {
    margin: 22px 135px 0 135px;
    background: url("../../assets/imgs/social/userSignout.png") no-repeat;
    height: 90px;
    width: 90px;
  }

  .signInBtn {
    margin: 16px 16px 20px 16px;
    height: 40px;
    width: 328px;
    background-color: #ffa702;
    color: #052d46;
    font-size: 14px;
  }
}
</style>
