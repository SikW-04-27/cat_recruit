<template>
  <ManageNav></ManageNav>
  <router-view></router-view>
</template>

<script>
import ManageNav from '../../components/ManageNav.vue'
import CheckPersonal from './check/CheckPersonal.vue'
import CheckRegistered from './check/CheckRegistered.vue'
export default {
  components: { ManageNav, CheckRegistered, CheckPersonal },

}
</script>

<style lang="scss">
</style>