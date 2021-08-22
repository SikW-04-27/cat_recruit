<template>
  <div class="avatar">
      <img src="https://img2.baidu.com/it/u=1305759230,3688102309&fm=26&fmt=auto&gp=0.jpg" alt="">
  </div>
  <div class="info">
      <p>姓名：xxxx</p>
      <p>方向：前端</p>
      <p>学号：3120004444</p>
      <p>手机号：13444444444</p>
        <router-link to="/modifycenter">
            <el-button type="primary">修改信息</el-button>
        </router-link>
  </div>

  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .avatar{
        width: 150px;
        margin: 20px auto;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }
    .updatainfo{
        width: 100px;
        height: 30px;
        border-radius: 10px;
    }
    .info{
        // width: 300px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        p{
            margin-bottom: 10px;
        }
    }
</style>