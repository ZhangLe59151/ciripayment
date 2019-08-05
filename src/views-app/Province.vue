<template>
  <div class="province">
    <van-nav-bar
      title="Province"
      left-text=""
      left-arrow
      right-text="Confirm"
      @click-left="$router.back()"
      @click-right="onClickRight"
      :border="false"
      class="fix-nav"
    />

    <el-form
      class="category"
      label-width="0px"
      ref="elForm"
      size="small"
      float="left"
    >
      <el-form-item>
        <el-input
          placeholder="Province"
          @input="handleSearch"
          v-model="searchKey"
          suffix-icon="el-icon-search"
        ></el-input>
      </el-form-item>
    </el-form>

    <van-cell
      :key="item.postal_code_prefix"
      :title="item.province"
      @click="handleClick(item)"
      right-icon="passed"
      v-for="item in list"
      :title-class="item.province == selectedProvince ? 'selected-title' : '' "
    >
      <van-icon
        slot="right-icon"
        name="passed"
        color="#26c485"
        size="20px"
        v-if="item.province == selectedProvince"
      />
    </van-cell>

  </div>
</template>

<script>
import { PROVINCES } from "@/assets/data/province.js";

export default {
  data() {
    return {
      list: PROVINCES,
      loading: false,
      finished: false,
      provinceName: "",
      provincePostalPrefix: "",
      searchKey: "",
      selectedProvince: ""
    };
  },
  watch: {
    searchKey: function() {
      this.handleSearch();
    }
  },
  created() {
    window.scroll(0, 0);
  },
  methods: {
    handleClick(value) {
      this.provinceName = value.province;
      this.provincePostalPrefix = value.postal_code_prefix;
      this.selectedProvince = value.province;
    },
    onClickRight(value) {
      if (!this.provinceName) {
        this.$toast("please choose province firstly.");
        return false;
      }
      this.$store.commit("UpdateForm", {
        provinceName: this.provinceName,
        provincePostalPrefix: this.provincePostalPrefix
      });
      this.$router.push({
        name: "EnterInfo",
        query: { flag: "back", position: this.$route.query.position }
      });
    },
    handleSearch() {
      // search list
      this.list = PROVINCES.filter(province => {
        return province.province
          .toLowerCase()
          .startsWith(this.searchKey.toLowerCase());
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.province {
  overflow-x: hidden;
  position: relative;
  .fix-nav {
    position: fixed;
    width: 100%;
  }
  .category {
    position: relative;
    margin-top: 40px;
    height: 40px;
    width: 100%;
    margin-bottom: 1px;
    border-left: 10px solid #26c485;

    > div {
      display: inline-block;
      width: calc(90% - 0.625rem);
      margin-left: 5%;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.8125rem;
      position: relative;
      top: 7px;
      overflow: scroll;
    }
  }
  .selected-title {
    color: #26c485;
  }
}
</style>
