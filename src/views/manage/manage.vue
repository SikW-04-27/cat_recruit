<template>
  <ManageNav></ManageNav>
  <CheckPersonal></CheckPersonal>
</template>

<script>
import ManageNav from '../../components/ManageNav.vue'
import CheckPersonal from './check/CheckPersonal.vue'
import CheckRegistered from './check/CheckRegistered.vue'
export default {
  components: { ManageNav, CheckRegistered, CheckPersonal },

}
</script>

<style>

</style>