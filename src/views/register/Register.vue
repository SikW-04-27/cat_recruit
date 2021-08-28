<template>
  <AccountOperate>
    <router-link
      to="/register/studentRegister"
      @click="a = true"
      :class="{ active: a }"
      >学生注册</router-link
    >
    <router-link
      to="/register/manageRegister"
      @click="a = false"
      :class="{ active: !a }"
      >管理员注册</router-link
    >
  </AccountOperate>
</template>


<script>
import { ref, defineComponent, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import AccountOperate from "../../components/AccountOperate.vue";

export default {
  name: "Register",
  components: {
    AccountOperate,
  },
  setup() {
    let a = ref(true);

    return {
      a,
    };
  },
};
</script>

<style lang="scss">
  a {
    margin: 0 10px;
    font-size: 14px;
    // color: #fff;
    transition: all .5s;
  }

  .active {
    font-size: 20px !important;
  }
</style>