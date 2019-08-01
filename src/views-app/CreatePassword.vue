<template>
  <div class="create-password">
    <WapHeader :right="true" />
    <div class="createPassWrapper">
      <div class="title">
        Create Password
      </div>
      <transition name="el-zoom-in-top">
        <div v-show="showComponents">
          <div class="description">
            Great! Now set up a password to secure your account.
          </div>
        </div>
      </transition>
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
  },
  data() {
    return {
      showComponents: true
    };
  }
};
</script>

<style lang="scss" scoped>
.create-password {
  .createPassWrapper {
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
      color: #2f3941;
      margin-top: 25px;
    }
  }
}
</style>
