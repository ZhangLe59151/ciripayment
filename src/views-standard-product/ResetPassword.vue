<template>
  <div class="reset-password">
    <WapHeader :right="true" />
    <div class="resetPassWrapper">
      <div class="title">
        Reset Password
      </div>
      <div class="description">
        Create a new password and try not to forget it this time.
      </div>
      <WapPasswordSetForm />
    </div>
  </div>
</template>

<script>
import WapHeader from "@/components/WapHeader";
import WapPasswordSetForm from "@/components/WapPasswordSetForm";
export default {
  name: "ResetPassword",
  components: {
    WapPasswordSetForm,
    WapHeader
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.reset-password {
  .resetPassWrapper {
    height: calc(100vh - 50px);
    overflow: hidden;
    padding-left: 5%;
    padding-right: 5%;
  }
  .title {
    margin-top: 50px;
    font-size: 24px;
    text-align: left;
    font-weight: bold;
  }

  .description {
    font-size: 16px;
    line-height: 24px;
    color: #2f3941;
    margin-top: 25px;
  }
}
</style>
