<template>
 <UserNav/>
 <Register/>

</template>

<script>

import Register from './views/register/Register.vue'
import UserNav from './components/UserNav.vue'


export default {
  name: "App",
  components: {
  Register,
  UserNav
  }
}
</script>
