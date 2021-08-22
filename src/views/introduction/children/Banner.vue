<template>
   <div class="banner">
      <div class="myFront" data-text="c.a.t工作室欢迎你！"> c.a.t工作室欢迎你！</div>

    <!-- <img src="../../assets/img/banner2.jpg" alt=""> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.banner {
  position: relative;
  width: 100%;
  height: 260px;
  background-color: #000;
  span {
    position: absolute;
    color: #fff;
    top: 40%;
    left: 33%;
    letter-spacing: 12px;
    font-size: 35px;
    font-weight: 700;
  }
  img {
    width: 100%;
    height: 260px;
  }
}

.myFront {
  position: absolute;
  top: 40%;
  left: 40%;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 3px;
  text-shadow: 0 0 20px #bd242b;
}

</style>