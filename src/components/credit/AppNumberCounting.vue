<template>
    <div class="app-numberTo-counting">
      {{displayNumber}} {{$store.state.currency}}
    </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util.js";

export default {
  name: "AppNumberCounting",
  props: { "numberTo": { default: 0 } },
  data: function() {
    return {
      displayNumber: 0,
      interval: false
    }
  },
  computed: { ...mapState({
    originalDisplayNumber: state => state.credit.currentCreditLimit }
  ) },
  created() {
    this.displayNumber = this.originalDisplayNumber;
  },
  ready: function() {
    this.displayNumber = this.numberTo ? this.numberTo : 0;
  },

  watch: {

    numberTo: function() {
      clearInterval(this.interval);

      if (this.numberTo == this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(function() {
        if (this.displayNumber != this.numberTo) {
          var change = (this.numberTo - this.displayNumber) / 10;

          change = change >= 0 ? Math.ceil(change) : Math.floor(change);

          this.displayNumber = this.displayNumber + change;
        }
      }.bind(this), 20);
    }

  }
}
</script>

<style scoped>

</style>
