<template>
  <div class="appMerchantList">
    <div class="title">Merchants Similar To You</div>
    <div class="card" >
      <img class="image" src="" />
      <div class="imgTitle">Little Thaus Co.</div>
      <div class="descriptText"><span class="iconfont iconretail" />128 Likes</div>
      <div class="descriptText"><span class="iconfont iconretail" />Retail Business</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appMerchantList",

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
.appMerchantList {
  height: 200px;
  width: 100%;
  background-color: #EBE9ED;

  .title {
    margin: 16px 16px 0 16px;
    font-size: 14px;
    color: black;
  }
  
  .card {
    margin: 4px 16px 4px 16px;
    height: 191px;
    width: 160px;
    background-color: white;

    .image {
      height: 120px;
      background-color: #A0B4C0;
    }

    .imgTitle {
      color: #2F3941;
      font-size: 14px;
      font-weight: bolder;
      margin: 3px 13px 0 3px;
    }

    .descriptText {
      color: #87929D;
      font-size: 12px;
      margin: 3px 3px 0 3px;
    }
  }

}
</style>
