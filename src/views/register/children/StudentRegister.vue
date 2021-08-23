<template>
  <div id="student-register">
    <input type="text" placeholder="邮箱" v-model="studentMail">
    <input type="text" placeholder="密码" v-model="studentPassword">
    <div class="tips">邮箱格式错误！</div>
    
  </div>
</template>


<script>
import { ref, onUpdated, onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
  name: 'StudentRegister',
  setup(props, {emit}) {
    let studentMail = ref('123');
    let studentPassword = ref('');

    const store = useStore();

    store.state.studentInformation.studentMail = studentMail


    let aaa = function(){
      console.log(35325);
    }

    onMounted(() => {
      // console.log(studentMail);
          // this.$emit('registerFn', [studentMail.value, studentPassword.value])
          // emit('registerFn');

    })

    return {
      studentMail,
      studentPassword,
      aaa
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