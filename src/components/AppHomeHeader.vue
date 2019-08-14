<template>
  <div class="app-home-header">
    <div>

    </div>

    <div class="info">
      <ul>
        <li>INCOME</li>
        <li>+100,000,000.00</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      default: {},
      type: Object
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-home-header {
  background: #ff8600;
  height: 130px;
  width: 100%;
  position: relative;

  .info {
  }
}
</style>
