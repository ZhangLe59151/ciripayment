<template>
  <div class="sic">
    <van-nav-bar
      title="Business Category"
      left-text=""
      left-arrow
      @click-left="$router.back()"
      :border="false"
    ></van-nav-bar>
    <div class="category">
      <div>
        <span class="header-line">{{$route.query.sicName}} > {{subsicName}}</span>
      </div>
    </div>
    <van-list
      :finished="finished"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        title-class="list-item-title"
        :title="item.name"
        @click="handleClick(item)"
      >
        <van-icon
          slot="right-icon"
          name="play"
          color="grey"
        />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { SUBSIC } from "@/assets/data/subsic.js";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      subsicId: "",
      subsicName: ""
    };
  },

  methods: {
    onLoad() {
      this.list = SUBSIC[`subsic-${this.$route.query.sicId}`];
      this.finished = true;
    },
    handleClick(value) {
      console.log(value.id);
      this.subsicId = value.id;
      this.subsicName = value.name;
      this.$router.push({
        name: "MCC",
        query: {
          flags: "back",
          sicId: this.$route.query.sicId,
          sicName: this.$route.query.sicName,
          subsicId: this.subsicId,
          subsicName: this.subsicName,
          position: this.$route.query.position
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sic {
  overflow-x: hidden;
  .category {
    height: 40px;
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
  .list-item-title {
    color: #053c5e;
    font-size: 17px;
  }
}
</style>
