<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="hasLeftArrow"
    @click-left="leftFunc ? leftFunc : $router.back()"
    @click-right="rightFunc"
  />
</template> 

<script>
export default {
  props: {
    leftText: {
      default: "",
      type: String
    },
    rightText: {
      default: "",
      type: String
    },
    leftArrow: {
      default: true,
      type: Boolean
    },
    title: {
      default: "",
      type: String
    },
    rightFunc: {
      type: Function
    },
    leftFunc: {
      type: Function
    },
    hasLeftArrow: {
      default: true,
      type: Boolean
    }
  }
};
</script>
