<template>
  <div class="success-page">
    <van-icon
      name="certificate"
      color="#26C485"
    />

    <div class="title">
      We’ve Received Your
      <br>Application
    </div>
    <div class="msg">
      You can check your application status
      <span @click="$router.push({name: 'ViewApplication'})">here</span>
    </div>
    <div class="msg">
      Click
      <span @click="gotoLine">here</span> to get updates on your application status via
      <img
        :src="line"
        alt
        width="30px"
        height="30px"
      >
    </div>

    <van-button
      size="large"
      class="bottom-btn"
      @click="$router.push({name: 'Welcome'})"
    >Done</van-button>
  </div>
</template>
<script>
import iconLine from "@/assets/imgs/ico-line.png";
export default {
  data() {
    return {
      line: iconLine
    };
  },
  methods: {
    gotoLine() {
      this.copyToClipboard(this.$store.state.lineCode);
      this.$dialog
        .confirm({
          message: `"Your code: ${this.$store.state.lineCode} has been copied. Add Silot Bank as a friend on LINE and paste your code in chat to start receiving updates on your application."`,
          title: "Connecting with LINE",
          confirmButtonText: "Go To LINE",
          cancelButtonText: "Cancel",
          type: "warning"
        })
        .then(() => {
          if (this.$store.state.lineUrl) {
            window.location.href = this.$store.state.lineUrl;
          } else {
            this.$notify("Invalid line url: ", this.$store.state.lineUrl);
          }
        })
        .catch(() => {
          this.$notify({
            message: "Cancelled"
          });
        });
    },

    copyToClipboard(string) {
      let textarea;
      let result;

      try {
        textarea = document.createElement("textarea");
        textarea.setAttribute("readonly", true);
        textarea.setAttribute("contenteditable", true);
        textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = string;

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand("copy");
      } catch (err) {
        console.error(err);
        result = null;
      } finally {
        document.body.removeChild(textarea);
      }

      // manual copy fallback using prompt
      if (!result) {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const copyHotkey = isMac ? "⌘C" : "CTRL+C";
        result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
        if (!result) {
          return false;
        }
      }
      return true;
    }
  },
  mounted() {
    console.log(this.$store.state);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.success-page {
  text-align: center;
  // margin-top: 30%;
  font-size: 120px;
  position: relative;
  top: 40px;
  .title {
    font-size: 27px;
  }

  .msg {
    font-size: 15px;
    margin-top: 20px;
    width: 90%;
    margin-left: 5%;
    line-height: 40px;
    text-align: center;

    > span {
      text-decoration: underline;
      text-align: center;
    }
  }
}
</style>
