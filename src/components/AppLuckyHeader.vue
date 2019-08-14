<template>
  <div class="app-lucky-header">
    <van-icon
      name="cross"
      class="close"
    />
    <div class="date">{{date}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ""
    };
  }
};
</script>


<style lang="postcss" scoped>
.app-lucky-header {
  height: 90px;
  position: relative;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .date {
    position: absolute;
    bottom: 0;
    left: 16px;
  }
}
</style>
