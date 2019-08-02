<template>
  <div class="select-bank">
    <app-profile-bank-header />

    <van-cell-group>
      <van-cell
        v-for="item in bankList"
        :key="item.id"
        :title="item.name"
        class="bank-item"
        is-link
        :to="{name: 'BankDetails', params: {id: item.id}}"
      >
        <img
          :src="compareImgUrl(item.id)"
          slot="icon"
        >
      </van-cell>
    </van-cell-group>
  </div>

</template>

<script>
import AppProfileBankHeader from "@/components/AppProfileBankHeader";
import { mapState } from "vuex";
export default {
  name: "SelectBank",
  components: {
    AppProfileBankHeader
  },
  data() {
    return {
      imgList: {
        bank00: require("@/assets/imgs/bank00.png"),
        bank01: require("@/assets/imgs/bank01.png"),
        bank02: require("@/assets/imgs/bank02.png"),
        bank03: require("@/assets/imgs/bank03.png"),
        bank04: require("@/assets/imgs/bank04.png")
      }
    };
  },
  computed: {
    ...mapState({
      bankList: "bankList"
    })
  },
  methods: {
    compareImgUrl(id) {
      return this.imgList[`bank0${id}`];
    }
  }
};
</script>

<style lang="scss" scoped>
.select-bank {
  .bank-item {
    height: 60px;
    line-height: 40px;
    img {
      height: 28px;
      width: 28px;
      margin-right: 10px;
      position: relative;
      top: 5px;
    }
    i {
      position: relative;
      top: 7px;
      font-size: 16px;
    }
  }
}
</style>
