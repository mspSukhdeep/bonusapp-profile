<template>
    <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
        <div class="modal-container"  @click.stop>
        
          <div class="modal-header">
            <slot name="header">
              
            </slot>
          </div>
            <div class="modal-wrapper">
            <div class="modal-body">
                <slot name="body">
              
                </slot>
            </div>
            </div>
            <div class="modal-close" @click="$emit('close')"></div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'modal'
}
</script>

<style lang="less">
@import "../style/bonus_profile.less";


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
  display: flex;
align-items: flex-start;
}

.modal-wrapper {
    overflow: scroll;
}

.modal-container {
    margin: auto;
    height: auto;
    width: 90%;
    max-height: 80%;
    max-width: 650px;
    box-sizing: border-box;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    color: @fg-color-light;
    font-size: @font-size-s;
    position: relative;
    display: flex;
    flex-flow: column;
}

.modal-header h3 {
  margin-top: 0;
  color: @color-green;
  font-size: @font-size-xl;
  margin: 5px 0 20px 0;
}

.modal-body {
  line-height: 1.5;
}

.modal-body li + li{
    margin-top: 8px;
}

.modal-default-button {
  float: right;
  padding: 10px 40px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-close{
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    background: url(https://assets.mspcdn.net/image/upload/bonus_in/icon/pop_close.png) no-repeat center center / 100%;
    top: 20px;
    right: 20px;
}

</style>
