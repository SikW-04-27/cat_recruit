<template>
   <div id="account">
    <div class="account-option">
      <!-- <slot name="student"></slot>
      <slot name="manager"></slot> -->
      <slot></slot>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#account {
  margin: 100px auto;
  width: 450px;
  // height: 360px;
  border: 1px solid #ccc;

  .account-option {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #1e4353;

    a {
      margin: 0 10px;
      font-size: 14px;
      color: #fff;

      &:hover {
        color: red;
      }
    }
  }

}

</style>