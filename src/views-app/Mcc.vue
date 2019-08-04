<template>
  <div class="sic">
    <van-nav-bar
      title="Business Category"
      left-text=""
      left-arrow
      right-text="Confirm"
      @click-left="$router.back()"
      @click-right="onClickRight"
      :border="false"
    ></van-nav-bar>
    <div class="category">
      <div>
        <span class="header-line">{{sicName}} > {{subsicName}} > {{mccName}}</span>
      </div>
    </div>
    <van-list
      :finished="finished"
      @load="onLoad"
    >
      <template v-for="item in list">
        <van-cell
          v-if="item.name==selectedValue"
          :key="item.id"
          :title="item.name"
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
          :title="item.name"
          @click="handleClick(item)"
          title-class="list-item-title"
          right-icon="passed"
        />
      </template>
    </van-list>
  </div>
</template>

<script>
import { MCC } from "@/assets/data/mcc.js";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      sicId: "",
      sicName: "",
      subsicId: "",
      subsicName: "",
      mccID: "",
      mccName: "",
      selectedValue: ""
    };
  },
  created() {
    this.sicId = this.$route.query.sicId;
    this.sicName = this.$route.query.sicName;
    this.subsicId = this.$route.query.subsicId;
    this.subsicName = this.$route.query.subsicName;
  },
  methods: {
    onLoad() {
      this.list = MCC[`mcc-${this.$route.query.subsicId}`];
      this.finished = true;
    },
    handleClick(value) {
      console.log(value);
      this.mccID = value.id;
      this.mccName = value.name;
      this.selectedValue = value.name;
    },
    onClickRight(value) {
      if (!this.mccID) {
        this.$toast("please choose MCC first.");
        return false;
      }
      this.$store.commit("UpdateForm", {
        sicId: this.sicId,
        sicName: this.sicName,
        subsicId: this.subsicId,
        subsicName: this.subsicName,
        mccID: this.mccID,
        mccName: this.mccName,
        sic: this.subsicId
      });
      this.$router.push({
        name: "EnterInfo",
        query: { flag: "back", position: this.$route.query.position }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sic {
  overflow-x: hidden;

  .category {
    padding: 10px;
    width: 100%;
    margin-bottom: 1px;
    border-left: 10px solid #26c485;

    > div {
      display: inline-block;
      width: calc(80% - 10px);
      margin-left: 5%;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #053c5e;
      font-size: 17px;
      // overflow: scroll;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #053c5e;
    }
  }
  .selected-title {
    color: #26c485;
    font-size: 17px;
  }
  .list-item-title {
    color: #053c5e;
    font-size: 17px;
  }
}
</style>
