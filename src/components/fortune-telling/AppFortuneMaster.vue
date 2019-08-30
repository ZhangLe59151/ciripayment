<template>
  <div class="app-fortune-master">
    <van-row
      type="flex"
      justify="space-between"
    >
      <van-col span="8">
        <fortune-telling-app-fortune-master-photo
          :masterId="master.id"
          class="icon"
        />
      </van-col>
      <van-col
        span="16"
        class="cnt"
      >
        <div :class="master.image">

        </div>
        <div class="name">
          {{master.name}}
        </div>

        <div
          class="view"
          @click="$router.push({name: 'MasterProfile', params: {id: master.id},query: {subtitle: subtitle}})"
        >
          {{$t("FortuneTelling.viewProfile")}}
          <van-icon name="play" />
        </div>
        <div class="desc">
          {{subtitle}}
        </div>
        <van-button
          class="choose-btn"
          border="false"
          @click="$emit('chooseMaster', master)"
        >
          {{$t("FortuneTelling.tellMyFortune")}}
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "AppFortuneMaster",

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
    subtitle() {
      return this.$tc(
        "FortuneTelling.likeDes",
        this.master.like === 1 ? 1 : 2,
        { n: this.master.likeCount }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-master {
  background: no-repeat center url("../../assets/imgs/fortune-telling/ppr.png");
  height: 200px;

  .icon {
    margin-top: 50px;
  }

  .cnt {
    margin: 40px 0 0 15px;
    position: relative;

    .tattoo {
      background: no-repeat center
        url("../../assets/imgs/fortune-telling/tattoo.png");
      background-size: contain;
      height: 74px;
      position: absolute;
      top: -23px;
      right: 22px;
      width: 34px;
    }

    .astrology {
      background: no-repeat center
        url("../../assets/imgs/fortune-telling/astrology.png");
      background-size: contain;
      width: 74px;
      height: 74px;
      position: absolute;
      top: -23px;
      right: 22px;
    }

    .name {
      font-size: 20px;
      color: #2f3941;
      letter-spacing: 0;
      line-height: 20px;
    }

    .view {
      font-size: 12px;
      color: #1f73b7;
      letter-spacing: 0;
      line-height: 16px;
      margin: 12px 0 8px;

      .van-icon-play {
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 12px;
      color: #68737d;
      letter-spacing: 0;
      line-height: 16px;
    }
    .choose-btn {
      background-color: #ffa702;
      border-radius: 4px;
      border-style: unset;
      width: 90%;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      margin-top: 12px;
      color: white;
    }
  }
}
</style>
