<template>
  <div id="student-register">
    <input type="text" v-model="studentMail">
    <input type="text" v-model="studentPassword">
    <div class="tips">邮箱格式错误！</div>
  </div>
</template>


<script>
import { ref, onUpdated, onMounted, watch} from 'vue'
import {useStore} from 'vuex'
export default {
  name: 'StudentRegister',
  setup(props, context) {
    let studentMail = ref('邮箱');
    let studentPassword = ref('密码');

    const store = useStore();
    	watch([studentMail,studentPassword],(newValue,oldValue)=>{
        // console.log(newValue)
			store.state.register.student.studentMail = newValue[0];
			store.state.register.student.studentPassword = newValue[1];
      store.state.register.inentity = 1;
			}) 

    return {
      studentMail,
      studentPassword
    }
  }

}
</script>

<style lang="scss" scoped>

#student-register {
  width: 400px;
  height: 200px;
  text-align: center;
  /* background-color: blue; */

  input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    border: 1px solid red
  }


}

</style>