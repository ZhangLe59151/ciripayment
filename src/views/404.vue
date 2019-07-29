<template>
  <div class="not-existing">
    <el-row class="not-existing-cnt">
      <el-col :span="24">E R R O R:</el-col>
      <el-col :span="24">404</el-col>
      <el-col :span="24">Oops, something went wrong.</el-col>
      <el-col :span="24">Check the link or refresh your page, or click the button below to return to the Home page.</el-col>
      <el-col :span="24">
        <el-button
          type="primary"
          class="not-existing-btn"
          @click="$router.replace({name: 'Welcome'})"
        >Return to Home</el-button>
      </el-col>

    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.not-existing {
  height: 100vh;
  .not-existing-btn {
    background-color: #052d46;
    border-color: #052d46;
  }
  .not-existing-cnt {
    margin: 10vh 5vh;
    text-align: center;

    div:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      color: #d8dee6;
      letter-spacing: 8px;
    }
    :nth-child(2) {
      font-size: 150px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 180px;
      font-weight: bold;
      text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
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
    }
    :nth-child(5) {
      margin-top: 40px;
    }
  }
}
</style>
