<template>
  <div id="account">
   
      <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#account {
  margin: 0 auto 0;
  width: 450px;
  // height: 360px;
  background-color: rgba(78, 78, 78, 0.5);


  input {
    padding-left: 10px;
    border-bottom: 2px solid #ffffff;
    background-color: rgba(0, 0, 0, 0) !important;
    margin-top: 28px;
    width: 210px;
    height: 30px;
    color: red;
    font-size: 13px;
  }
}

$color: #0bc7f4;

.myButton {
  color: $color;
  // padding: 10px 30px;
  width: 100px;
  height: 40px;
  line-height: 40px;
}

.myButton:hover {
  background: $color;
  box-shadow: 0 0 50px $color;
}

.myButton::before {
  border-top: 2px solid $color;
  border-left: 2px solid $color;
}

.myButton::after {
  border-bottom: 2px solid $color;
  border-right: 2px solid $color;
}
</style>