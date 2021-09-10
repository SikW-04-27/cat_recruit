<template>
   <div id="introductin-title" class="myButton"><slot></slot></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/button.scss";


#introductin-title {
  margin: 0 auto 8px;
  width: 140px;
  height: 38px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 2px;
}

$color: rgb(27, 186, 235);

.myButton {
  margin: 0 auto;
  color: $color;
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