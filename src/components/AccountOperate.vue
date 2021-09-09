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
  margin: 80px auto 0;
  width: 450px;
  // height: 360px;
  // background-color: rgba(78, 78, 78, 0.5);


  // input {
  //   // padding-left: 10px;
  //   // border-bottom: 2px solid #ffffff;
  //   display: block;
  //   margin: 0 auto;
  //   width: 300px;
  //   height: 40px;
  //   color: red;
  //   font-size: 13px;
  //   border-radius: 10px;
  // }
  input {
    width: 380px;
    height: 45px;
    border-color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-radius: 30px;
    font-size: 14px;
    padding: 0px;
    text-align: center;
    line-height: 20px;
    font-weight: normal;
    font-style: normal;
      background-color: rgba(255, 255, 255, .8) !important;
  }
}

$color: #3a62d7;

/*
.myButton {
  color: $color;
  // padding: 10px 30px;
   width: 380px;
    height: 45px;
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

.myButton {
  // border-radius: 10px;
  background-color: #6689f0;
}

*/
</style>