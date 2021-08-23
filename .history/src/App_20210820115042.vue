<template>
  <div class="middle">
    <UserNav></UserNav>
    <Manage></Manage>
  </div>
</template>

<script>
import Register from "./views/register/Register.vue";
import UserNav from "./components/UserNav.vue";
import Manage from "./views/manage/manage.vue";
import Appointment from './'

export default {
  name: "App",
  components: {
    Manage,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
body {
  background-color: rgb(41, 45, 63);
}
.middle {
  width: 1200px;
  margin: 0 auto;
}
</style>