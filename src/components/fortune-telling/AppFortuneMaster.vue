<template>
  <div class="app-fortune-master">
    <van-row type="flex" justify="space-between">
      <van-col span="12">
        <fortune-telling-app-fortune-master-photo :masterId="master.id" />
      </van-col>
      <van-col span="12">
        <div class="name">
          {{master.name}}
        </div>
        <div class="desc">
          {{master.desc}}
        </div>
        <van-button
          class="choose-btn"
          border="false"
          @click="$emit('chooseMaster', master)">
          I Choose You
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
        return {}
      },
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.app-fortune-master {
  margin-left: 16px;
  margin-right: 16px;
  .name {
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 13px;
  }
  .desc {
    font-size: 14px;
    color: white;
    margin-top: 8px;
  }
  .choose-btn {
    background-color: #ff8600;
    border-radius: 4px;
    border-style: unset;
    width: 90%;
    height: 40px;
    font-size: 14px;
    margin-top: 20px;
    color: white;
  }
}
</style>
