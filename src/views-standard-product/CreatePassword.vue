<template>
  <div class="create-password">
    <WapHeader :right="true" />
    <div class="createPassWrapper">
      <div class="title">
        Create Password
      </div>
      <div class="description">
        Great! Now set up a password to secure your account.
      </div>
      <div class="description">
        This password will be used for future logins.
      </div>
      <WapPasswordSetForm />
    </div>

  </div>
</template>

<script>
import WapPasswordSetForm from "@/components/WapPasswordSetForm";
import WapHeader from "@/components/WapHeader";
export default {
  name: "CreatePassword",
  components: {
    WapPasswordSetForm,
    WapHeader
  }
}
</script>

<style lang="scss" scoped>
  .create-password{
    .createPassWrapper{
      padding-left: 5%;
      padding-right: 5%;
    .title {
      margin-top: 50px;
      font-size: 24px;
      text-align: left;
      font-weight: bold;
    }
    .description {
      font-size: 16px;
      line-height: 24px;
      color: #2F3941;
      margin-top:25px;
    }
  }
}

</style>
