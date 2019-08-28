<template>
    <div class="app-credit-qa-mapper">
      <money-input-question v-if="String(question.type)==='1'" :question="question" />
      <text-input-question v-else-if="String(question.type)==='2'" :question="question" />
      <radio-input-question v-else-if="String(question.type)==='3'" :question="question"/>
      <camera-input-question v-else-if="String(question.type)==='4'" :question="question"/>
      <picture-input-question v-else :question="question" />
    </div>
</template>

<script>
import MoneyInputQuestion from "@/components/credit/MoneyInputQuestion";
import TextInputQuestion from "@/components/credit/TextInputQuestion";
import RadioInputQuestion from "@/components/credit/RadioInputQuestion";
import PictureInputQuestion from "@/components/credit/PictureInputQuestion";
import CameraInputQuestion from "@/components/credit/CameraInputQuestion";
export default {
  name: "AppCreditQAMapper",
  components: {
    CameraInputQuestion,
    PictureInputQuestion,
    RadioInputQuestion,
    TextInputQuestion,
    MoneyInputQuestion
  },
  props: ["question"]
};
</script>

<style lang="scss" scoped>
.app-credit-qa-mapper {
}
</style>
