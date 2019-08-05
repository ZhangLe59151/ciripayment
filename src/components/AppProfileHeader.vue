<template>
  <div class="app-profile-header">
    <div class="title">
      <van-icon
        name="arrow-left"
        @click="$router.push({name: 'Settings'})"
      />
      <span>{{info.bizNameEn}}</span>

      <div class="info">
        <div class="status">
          <div>
            <van-icon name="checked" /> <span class="verified">Verified</span>
          </div>
          <div class="time">Last Updated: {{convertUTCTimeToLocalTime(info.modifyTime)}}</div>
        </div>
        <div
          class="btn"
          v-if="showUpdateBtn"
        >
          <van-button
            type="default"
            size="small"
            class="update-btn"
            @click="$router.push({name: 'UpdateProfile'})"
          >Update Profile</van-button>
        </div>
      </div>
    </div>

    <div
      class="icon"
      v-if="$store.state.deviceType === 'APP'"
    >

    </div>
  </div>
</template>

<script>
import util from "@/util";
export default {
  props: {
    info: {
      default: {},
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("ShowPopup");
    },
    convertUTCTimeToLocalTime(dateTime) {
      return util.convertUTCTimeToLocalTime(dateTime);
    }
  },
  computed: {
    showUpdateBtn() {
      // show this ele when application status != submitted
      return this.info.applicationStatus + "" !== "0";
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@mixin item-position {
  position: absolute;
  top: 24px;
  font-size: 20px;
  color: #ffffff;
  display: inline-block;
}

.app-profile-header {
  background: #053c5e;
  height: 130px;
  width: 100%;
  position: relative;
  .title {
    @include item-position;
    left: 16px;
    width: calc(100% - 32px);
    > span {
      position: relative;
      top: -3px;
      left: 8px;
    }
  }

  .info {
    height: 140px;
    margin-top: 16px;
    position: relative;
    .status {
      font-size: 12px;
      color: #04a777;
      letter-spacing: 0;

      .verified {
        position: relative;
        top: -2px;
        left: 4px;
      }

      .time {
        font-size: 12px;
        color: #87929d;
        letter-spacing: 0;
        position: relative;
        top: 4px;
      }
    }

    .btn {
      position: absolute;
      right: 0;
      top: 2px;
      .update-btn {
        border: 1px solid #ffffff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
        background: #053c5e;
        padding: 0 16px;
      }
    }
  }
}
</style>
