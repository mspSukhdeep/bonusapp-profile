<template>
    <div class="msg__scss">
        <div class="msg__star-wrpr">
            <div class="msg__star">
            </div>
            <img class="msg__thumb" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/thumbsup.png" />
        </div>
        <div class="msg__scss-msg">
            {{title}}
        </div>
        <div class="msg__scss-txt">
            {{description}}
        </div>
    </div>
</template>
<script>
export default {
  name: "SuccessMessage",
  props: ["title", "description"]
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";
.msg {
  &__star {
    width: 48px;
    height: 48px;
    margin: 0 auto;
    .image-2x('http://assets.mspcdn.net/f_auto/bonus_in/icon/star.png', 48px);
    animation: rotate 3s ease-in-out 1;
    &-wrpr {
      position: relative;
    }
  }
  &__thumb {
    position: absolute;
    .absolute-center();
    width: 2px;
    animation: zoomIn 3s ease-in-out 1 forwards;
  }
  &__scss {
    color: @fg-color;
    text-align: center;
    padding: 60px 15px;

    &-msg {
      font-size: @font-size-3xl;
      font-weight: @bold;
      margin-top: 15px;
    }
    &-txt {
      margin-top: 8px;
    }
    &-item {
      margin-top: 4px;
      font-weight: @bold;
    }
    &-ntfctn {
      margin-top: 36px;
    }
  }
}
@media screen and (max-width: @breakpoint) {
.msg{
    &__scss{
        padding: 40px 15px;
        &-msg{
            font-size: @font-size-xl;
            font-weight: @semi-bold;
        }
        &-txt{
            color: @fg-color-light;
            font-size: @font-size-xs;
        }
    }
}
}

</style>
