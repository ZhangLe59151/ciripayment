<template>
  <div class="sic">
    <van-nav-bar
      title="Business Category"
      left-text=""
      left-arrow
      @click-left="$router.push({name: $route.query.origin, query: {flag: 'back', position: $route.query.position}})"
      @click-right="$router.push({name: 'SubSIC',query: {sic: sic, position: $route.query.position}})"
      :border="false"
    ></van-nav-bar>

    <van-list
      :finished="finished"
      @load="onLoad"
    >
      <div class="category">
        <span></span>
        <span class="header-line">Select Business Category</span>
      </div>
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
import { SIC } from "@/assets/data/sic.js";

export default {
  data() {
    return {
      list: SIC,
      loading: false,
      finished: false,
      sic: ""
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      this.list = SIC;
      this.finished = true;
    },
    handleClick(value) {
      this.sic = value;
      this.$router.push({
        name: "SubSIC",
        query: {
          sicId: this.sic.id,
          sicName: value.name,
          position: this.$route.query.position,
          origin: this.$route.query.origin
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  height: 40px;
  width: 100%;
  margin-top:20px;
  margin-bottom: 1px;
  background-color: #F2F2F2;

  span {
    display: inline-block;

    &:first-child {
      width: 10px;
      background-color: #26c485;
      height: 40px;
    }

    &:last-child {
      width: calc(80% - 12px);
      margin-left: 5%;
      height: 40px;

      font-size: 17px;
      line-height: 40px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #2F3941;
    }
  }
}
.list-item-title {
  color: #2F3941;
  font-size: 17px;
}
</style>
