<template>
  <section>
    <app-common-header/>
    <!-- <div class="article">
      <div class="title">"พระจูเลียน" รับเสพเมถุน ขอโทษคนไทย เตรียมสึกพรุ่งนี้</div>
      <div class="date">12 July 2019</div>

      <img src="@/assets/imgs/rectangle.png">

      <div
        class="cnt"
      >Volatile Dow Jones hedge fund rates bonds fluctuate bear capital district. Securities passively taxpayer funds market dividends value financial health quarterly. Index investment performance interest potential taxpayer retirement dividends. Government credit comodity receive dividends economy. Capital exchange NYSE funds potential government federal dividends term district established economy treasury. Potential interest rate Dow Jones financial health bills NYSE exchange index funds established exchange traded funds municipal managed comodity bonds. Public notes volatile Moody's credit interest funds Fitch economy retirement.</div>
    </div>-->
    <iframe
      class="articleIframe"
      :src="this.$route.query.url"
      id="show-iframe"
      frameborder="0"
      width="100%"
      scrolling="auto"
    />
  </section>
</template>

<script>
import AppCommonHeader from "@/components/AppCommonHeader";
export default {
  components: {
    AppCommonHeader
  }
};
</script>

<style lang="scss" scoped>
.articleIframe {
  height: calc(100vh - 44px);
}
.article {
  margin: 16px;
  img {
    height: 160px;
    width: 100%;
  }
  .title {
    font-weight: bold;
    font-size: 24px;
    color: #2f3941;
    letter-spacing: 0;
  }

  .date {
    font-size: 16px;
    color: #68737d;
    letter-spacing: 0;
    line-height: 22px;
    margin: 10px 0 20px;
  }

  .cnt {
    margin-top: 20px;
    font-size: 16px;
    color: #68737d;
    letter-spacing: 0;
    line-height: 22px;
  }
}
</style>
