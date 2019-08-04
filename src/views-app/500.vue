<template>
  <div class="server-error">
    <el-row class="server-error-cnt">
      <el-col :span="24">E R R O R:</el-col>
      <el-col :span="24">500</el-col>
      <el-col :span="24">Oops, an error occured.</el-col>
      <el-col :span="24">Refresh your page. If the error persists, please contact us at <a href="mailto:support@silot.ai">support@silot.ai</a> with the link and error code.</el-col>
      <el-col :span="24">
        <el-button
          type="primary"
          class="server-error-btn"
          @click="$router.replace({name: 'Home'})"
        >Return to Home</el-button>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleRetry() {
      if (this.$route.query.url) {
        window.location.href = this.$route.query.url;
        return false;
      }
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.server-error {
  height: 100vh;
  .server-error-btn {
    background-color: #052d46;
    border-color: #052d46;
  }
  .server-error-cnt {
    margin: 10vh;
    text-align: center;

    div:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      color: #d8dee6;
      letter-spacing: 8px;
    }
    :nth-child(2) {
      font-size: 150px;
      color: #d8dee6;
      letter-spacing: 0;
      line-height: 180px;
      font-weight: bold;
    }
    :nth-child(3) {
      font-size: 20px;
      color: #444444;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: bold;
      margin: 32px 0 24px;
    }
    :nth-child(4) {
      font-size: 16px;
      color: #444444;
      letter-spacing: 0;
      line-height: 22px;
      a {
        font-size: 16px;
        color: #0059ff;
        text-decoration: none;
      }
    }
    :nth-child(5) {
      margin-top: 40px;
    }
  }
}
</style>
