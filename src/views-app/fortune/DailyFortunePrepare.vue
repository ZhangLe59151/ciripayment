<template>
  <div class="daily-fortune">
    <fortune-telling-app-fortune-header
      :showTitle="title"
      :showLeftIcon="true"
      :showRightIcon="false"
      :letfFunc="handleLeftFunc"
    />
    <div class="top-desc">
      {{$t("FortuneTelling.selectMasterDes")}}
    </div>
    <div class="master-select">
      <fortune-telling-app-fortune-master
        v-for="(master,index) in masterList"
        class="fortune-master-item"
        :master="master"
        @chooseMaster="chooseMaster"
        :key="index"
      />
    </div>

    <div class="master-select-tip">
      {{$t("FortuneTelling.selectMasterTips")}}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { find } from "lodash";
export default {
  name: "DailyFortunePrepare",
  data() {
    return {
      masterList: require("@/assets/data/fortuneMasterList.json"),
      title: this.$t("Fortune.dailyTitle")
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {
    handleLeftFunc() {
      this.$router.replace({ name: "Home" });
    },
    chooseMaster(master) {
      this.$store.commit(
        "SaveFortuneInfo",
        Object.assign({}, this.fortuneInfo, { selectedMaster: master })
      );
      this.$router.push({ name: "DailyFortuneQuestion", params: { id: 1 } });
    },
    bindLikeObIntoMasterList(likeArr) {
      const arr = [];
      this.masterList.map(item => {
        const likeOb = find(likeArr, { masterId: item.id });
        const _item = Object.assign({}, item, likeOb);
        arr.push(_item);
      });

      return arr;
    }
  },
  mounted() {
    this.$api.getLikeCount().then(res => {
      if (res.data.code === 200) {
        this.masterList = this.bindLikeObIntoMasterList(res.data.data);
        return;
      }

      this.$toast(res.data.msg);
    });
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;

  .top-desc {
    width: 100%;
    font-size: 16px;
    color: white;
    text-align: center;
  }

  .master-select {
    width: 100%;
    height: 450px;
    margin-top: 40px;

    .fortune-master-item {
      margin-bottom: 24px;
    }
  }

  .master-select-tip {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 20px;
    width: 250px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .powered-tips {
    position: absolute;
    color: white;
    font-size: 10px;
    text-align: center;
    bottom: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: 10px;
    opacity: 0.7;
  }
}
</style>
