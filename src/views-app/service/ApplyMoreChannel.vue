<template>
  <div class="apply-more-channel">
    <apply-more-channel-header v-bind:step.sync="step"/>
    <apply-more-channel-content v-bind:step.sync="step"/>

  </div>
</template>

<script>
import ApplyMoreChannelHeader from "@/components/service/ApplyMoreChannelHeader";
import ApplyMoreChannelContent from "@/components/service/ApplyMoreChannelContent";
export default {
  name: "ApplyMoreChannel",
  components: {
    ApplyMoreChannelHeader,
    ApplyMoreChannelContent
  },
  data() {
    return {
      step: "1"
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-more-channel{
    min-height: 100vh;
  }
</style>
