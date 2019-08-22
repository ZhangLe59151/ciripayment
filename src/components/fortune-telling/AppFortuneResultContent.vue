<template>
  <div class="app-fortune-result-content">
    <div class="background-card">
      <fortune-telling-app-fortune-master-photo class="master-photo" :masterId="fortuneInfo.selectedMaster.id" />
      <div class="result-box">
        <div class="date">
          {{today}}
        </div>
        <div class="fortune-result">
          {{fortuneResult.fortuneResult}}
        </div>
        <div class="sales-desc">
          Sales Target Today
        </div>
        <div class="sales-result">
          <div v-if="fortuneResult.salesTarget.type === 0">
            <span>{{fortuneResult.salesTarget.incomeResult.min}}</span><span class="currency">{{currency}}</span>
            <span> ~ </span>
            <span>{{fortuneResult.salesTarget.incomeResult.max}}</span><span class="currency">{{currency}}</span>
          </div>
          <div v-else>
            {{fortuneResult.salesTarget.generalResult}}
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFortuneResultContent",
  props: {
    currency: {
      default: "",
      type: String
    },
    fortuneInfo: {
      default() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      today: ""
    }
  },
  computed: {
    fortuneResult() {
      return this.fortuneInfo.fortuneResult
    }
  },
  mounted() {
    this.today =  this.$moment().format("DD MMM YYYY")
  }
}
</script>

<style lang="scss" scoped>
  .app-fortune-result-content {
    position: relative;
    height: 65vh;
    width: 100%;
    text-align: center;
    .background-card {
      position: absolute;
      background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_result_card.png");
      background-size: contain;
      top: 50px;
      width: 100%;
      height: 100%;
      .master-photo {
        position: absolute;
        margin-left: calc(50% - 65px);
        transform: scale(0.75);
        top: -50px;
      }
      .result-box {
        position: absolute;
        left: 80px;
        right: 60px;
        top: 50%;
        height: 100%;
        transform: translateY(-50%);
        .date {
          position: absolute;
          color: #D44832;
          font-size: 16px;
          top: 96px;
          width: 100%;
          height: 18px;
          text-align: center;
        }
        .fortune-result {
          position: absolute;
          color: #2F3941;
          font-size: 20px;
          top: 134px;
          width: 100%;
          height: 100px;
          text-align: center;
          overflow: scroll;
        }
        .sales-desc {
          position: absolute;
          color: #68737D;
          font-size: 14px;
          bottom: 107px;
          width: 100%;
          height: 16px;
          text-align: center;
        }
        .sales-result {
          position: absolute;
          color: black;
          font-size: 24px;
          bottom: 72px;
          width: 100%;
          height: 28px;
          text-align: center;
          .currency {
            font-size: 12px;
            font-weight: bold;
            color: #2F3941;
            vertical-align: text-top;
          }
        }
      }
    }
  }

</style>
