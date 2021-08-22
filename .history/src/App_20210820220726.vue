<template>
    <!-- <Appointment></Appointment> -->
    <!-- <Form></Form> -->
</template>

<script>
import Register from "./views/register/Register.vue";
import UserNav from "./components/UserNav.vue";
import Manage from "./views/manage/manage.vue";
import Appointment from './views/appointment/Appointment.vue'
import Form from './views/signup/Form.vue'
import Progress from './views/progress/progress.vue'

export default {
  name: "App",
  components: {
    Manage,
    Appointment,
    Form,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
body {
  // background-color: rgb(41, 45, 63);
}
.middle {
  width: 1200px;
  margin: 0 auto;
}
</style>