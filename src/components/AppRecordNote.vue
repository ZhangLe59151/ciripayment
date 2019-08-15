<template>
  <div class="app-record-note">
    <van-row class="input_label">
        Note (Optional)
    </van-row>
    <van-field class="input_note"
        v-model="value" 
        placeholder="Add Note" />

  </div>
</template>

<script>
import Vue from 'vue';
import { Row, Col, Field } from 'vant';

Vue.use(Row).use(Col).use((Field));

export default {
  name: "AppRecordNote",
  props: {},
  data() {
    return {
        value: ''
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

.app-record-note {
  margin-top:16px;
    margin-right:16px;
    margin-left:16px;
    height: 64px;

    .input_label {
        height: 20px;
        font-size: 14px;
    }

    .input_note {
        top: 4px;
        height: 40px;
        font-size: 24px;
    }

    .input:focus {
        border: 2px solid #333;
        outline: none;
    }
}

</style>
