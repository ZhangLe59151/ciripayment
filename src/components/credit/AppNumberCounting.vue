<template>
    <div class="app-numberTo-counting">
      {{formatCurrency(displayNumber)}} {{$store.state.currency}}
    </div>
</template>

<script>
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
  created() {
    this.displayNumber = this.numberTo;
  },
  methods: {
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
      // change to string
      val = String(val);
      // don't validate empty input
      if (val === "") {
        return;
      }

      // check for decimal
      if (val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimalPos = val.indexOf(".");

        // split number by decimal point`
        var leftSide = val.substring(0, decimalPos);
        val = leftSide;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        val = this.formatNumber(val);
      }
      // send updated string to input
      return val;
    }
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
