<template>
  <div class="app-loan-exceed-limit-instruction">
    <div class="ins-title">{{$t("LoanExceedLimitError.ins.title")}}</div>
    <div class="ins-wrapper">
      <div>
        <div class="bullet">
          1
        </div>
        <div class="bullet-msg">
          {{$t("LoanExceedLimitError.ins.bullet1")}}
          <div class="img-wrapper" style="width: 100%">
            <img src="@/assets/imgs/loan/ledger.png" class="add-record" />
          </div>
        </div>
      </div>
      <div style="margin-top:20px">
        <div class="bullet">
          2
        </div>
        <div class="bullet-msg">
          {{$t("LoanExceedLimitError.ins.bullet2")}}
          <div class="img-wrapper" style="width: 100%;">
              <img src="@/assets/imgs/loan/credit.png" class="credit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoanExceedLimitInstruction"
}
</script>

<style lang="scss" scoped>
  .app-loan-exceed-limit-instruction{
    margin-top: 8px;
    height: 300px;
    width:100%;
    background-color: white;
    box-sizing: border-box;
    padding: 20px 16px 20px 16px;
    font-size: 14px;
    .ins-title{
      font-weight: bold;
      color: #2F3941;
      text-align: center;
    }
    .ins-wrapper{
      margin-top: 20px;
      .bullet{
        background-color: #21BA8D;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        vertical-align:top;
      }
      .bullet-msg{
        display: inline-block;
        margin-left: 8px;
        width: calc(100vw - 60px);
        .add-record {
          margin-top: 10px;
          height: 60px;
          width: auto;
        }
        .credit {
          margin-top: 10px;
          height: 40px;
          width: auto;
        }
      }

    }
  }
</style>
