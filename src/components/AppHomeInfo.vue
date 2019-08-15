<template>
  <div class="app-home-info">
    <div class="title">{{$t("Home.info")}}</div>

    <div
      class="info-box"
      v-for="item in arr"
      :key="item.id"
    >
      <div @click="$router.push({name: 'ArticleExternal', query: { url: item.link}})">
        <van-row
          type="flex"
          justify="space-between"
        >
          <van-col span="16">
            <div class="arc-title">{{item.title}}</div>
            <!-- <div class="arc-des">{{item.des}}</div> -->
          </van-col>
          <van-col span="8">
            <img :src="item.icon">
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
const list = require("@/mockData/info.json").list;
export default {
  data() {
    return {
      arr: []
    };
  },
  created() {
    this.$api.getHomeInformation().then(res => {
      if (res.data.code === 200) {
        this.arr = res.data.data.articleVOList;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.app-home-info {
  padding: 16px;
  background: #ffffff;
  .title {
    font-size: 12px;
    color: #2f3941;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .info-box {
    border: 1px solid #e9ebed;
    box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin-bottom: 10px;

    .van-col--8 {
      text-align: right;
      img {
        height: 100%;
        width: 88px;
      }
    }

    .arc-title {
      margin: 25px 8px 25px 16px;
      font-size: 16px;
      color: #2f3941;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .arc-des {
      font-size: 12px;
      color: #68737d;
      margin: 0 16px 16px 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
