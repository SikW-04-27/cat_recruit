<template>
  <div id="register">
    <div class="register-option" >
      <router-link to="/register/studentRegister"  @fn="fn">学生注册</router-link>
      <router-link to="/register/manageRegister">管理员注册</router-link
      >
    </div>
    <router-view></router-view>
    <studentRegister ref="child"></studentRegister>
    <button @click="registerFn">注册</button>
  </div>
</template>


<script>
import {ref, defineComponent, onMounted, reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'

import studentRegister from './children/StudentRegister.vue'

export default {
    name: 'Register',
    components:{studentRegister},

    setup(props, context) {
      let student = ref('');
      let store = useStore();

      let child = ref<HTMLElement>(null)

      function registerFn(){
        // console.log(student.studentMail);
        console.log(store.state.studentInformation.studentMail);
        console.log(child.value.aaa);
       } 
      //  console.log(context);

       function fn(v) {
         console.log(v);
       }

      //  let router = useRouter();
      //  console.log(router);

      //  let route = useRoute();
      //  console.log(route);
       onMounted(() => {
        //  console.log(this.$refs.student);
       })
       return {
      registerFn,
      student,
      fn,
      child
  
    }

    }}
  

</script>

<style lang="scss" scoped>
#register {
  margin: 100px auto;
  width: 450px;
  // height: 360px;
  border: 1px solid #ccc;

  .register-option {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #1e4353;

    a {
      margin: 0 10px;
      font-size: 14px;
      color: #fff;

      &:hover {
        color: red;
      }
    }
  }

  button {
    // margin-top: 30px;
    margin: 0 0 0 135px;
    width: 120px;
    height: 36px;
  }
}

/*  引入特效 */
</style>