<template>
<UserNav/>

</template>

<script>

import Register from './views/register/Register.vue'
import UserNav from './components/UserNav.vue'
import Manage from './views/manage/manage.vue'


export default {
  name: "App",
  components: {
  Register,
  UserNav
  }
}
</script>
