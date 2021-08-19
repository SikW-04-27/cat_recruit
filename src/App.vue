<template>
  <Appointment></Appointment>
</template>

<script>
import Register from "./views/register/Register.vue";
import UserNav from "./components/UserNav.vue";
import Appointment from "./views/appointment/Appointment.vue";

export default {
  name: "App",
  components: {
    Register,
    UserNav,
    Appointment,
  },
};
</script>
