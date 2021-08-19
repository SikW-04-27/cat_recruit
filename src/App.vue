<template>

  <div class="middle">
    <Manage></Manage>
  </div>

</template>

<script>
import Manage from './views/manage/manage.vue'




export default {
  name: "App",
  components: {
    Manage

  }
}
</script>

<style lang="scss">
  body{
    background-color: rgb(41, 45, 63);
  }
  .middle{
    width: 1200px;
    margin: 0 auto;
  }
</style>