<template>
  <div class="sic">
    <van-nav-bar
      :title="$t('EnterLoanInfo.bizCat')"
      left-text=""
      left-arrow
      :right-text="$t('Record.confirm')"
      @click-left="$router.back()"
      @click-right="onClickRight"
      :border="false"
    ></van-nav-bar>
    <div class="category">
      <div>
        <span class="header-line">{{sicName}} > {{mccName}}</span>
      </div>
    </div>
    <van-list
      :finished="finished"
      @load="onLoad"
    >
      <template v-for="item in list">
        <van-cell
          v-if="item[`${language}Name`]==selectedValue"
          :key="item.id"
          :title="item[`${language}Name`]"
          title-class="selected-title"
          @click="handleClick(item)"
          right-icon="passed"
        >
          <van-icon
            slot="right-icon"
            name="passed"
            color="#26c485"
            size="20px"
          />
        </van-cell>
        <van-cell
          v-else
          :key="item.id"
          :title="item[`${language}Name`]"
          @click="handleClick(item)"
          title-class="list-item-title"
          right-icon="passed"
        />
      </template>
    </van-list>
  </div>
</template>

<script>
// import { MCC } from "@/assets/data/mcc.js";
import { SUBSIC as MCC } from "@/assets/data/subsic.js";

export default {
  data() {
    return {
      language: localStorage.getItem("lang") || "th",
      list: [],
      loading: false,
      finished: false,
      sicId: "",
      sicName: "",
      // subsicId: "",
      subsicName: "",
      mccID: "",
      mccName: "",
      selectedValue: ""
    };
  },
  created() {
    this.sicId = this.$route.query.sicId;
    this.sicName = this.$route.query.sicName;
    // this.subsicId = this.$route.query.subsicId;
    this.subsicName = this.$route.query.subsicName;
  },
  methods: {
    onLoad() {
      // this.list = MCC[`mcc-${this.$route.query.subsicId}`];
      this.list = MCC[`subsic-${this.$route.query.sicId}`];
      this.finished = true;
    },
    handleClick(value) {
      console.log(value);
      this.mccID = value.id;
      this.mccName = value[`${this.language}Name`];
      this.selectedValue = value[`${this.language}Name`];
    },
    pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
    onClickRight(value) {
      if (!this.mccID) {
        this.$toast(this.$t("categoryErrorMsg"));
        return false;
      }
      this.$store.commit("UpdateForm", {
        sicId: this.sicId,
        sicName: this.sicName,
        // subsicId: this.subsicId,
        subsicName: this.subsicName,
        mccID: this.pad(this.mccID, 4),
        mccName: this.mccName
        // sic: this.subsicId
      });
      this.$router.push({
        name: this.$route.query.origin,
        query: { flag: "back", position: this.$route.query.position }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sic {
  overflow-x: hidden;
  min-height: 100vh;

  .category {
    width: 100%;
    height: 40px;
    margin-bottom: 1px;
    margin-top: 20px;
    border-left: 10px solid #26c485;
    background-color: #F2F2F2;

    > div {
      display: inline-block;
      width: calc(80% - 10px);
      margin-left: 5%;
      height: 40px;
      line-height: 40px;
      font-size: 17px;
      // overflow: scroll;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #2F3941;
    }
  }
  .selected-title {
    color: #26c485;
    font-size: 17px;
  }
  .list-item-title {
    color: #2F3941;
    font-size: 17px;
  }
}
</style>
