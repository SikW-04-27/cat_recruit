<template>
  <div class="middle">
    <UserNav></UserNav>
    <!-- <Manage></Manage> -->
  </div>
</template>

<script>
import Register from "./views/register/Register.vue";
import UserNav from "./components/UserNav.vue";
import Manage from "./views/manage/manage.vue";

export default {
  name: "App",
  components: {
    UserNav,
    Manage
  }
}
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/base.css";
// body {
//   background-color: rgb(41, 45, 63);
// }
.middle {
  width: 1200px;
  margin: 0 auto;
}
</style>