<template>
  <footer class="footer">
    <a class="footer__link" target="_blank" href="https://www.bonusapp.com/privacy.html">Privacy Policy</a>
    <a class="footer__link" target="_blank" href="https://www.bonusapp.com/terms/">Terms and Conditions</a>
  </footer>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style lang="less">
.footer {
    display: flex;
    padding: 30px;
  &__link {
      flex-grow: 1;
        text-align: center;
    & + & {
      margin-left: 20px;
    }
  }
}
</style>
