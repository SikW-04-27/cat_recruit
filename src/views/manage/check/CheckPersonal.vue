<template>
  <div class="personal">
      <div class="introduce">
        <span>姓名: xxxx</span><br><br>
        <span>学院专业：计算机学院软件工程</span><br><br>
        <span>方向：前端</span><br><br>
        <span>学号：3120004444</span><br><br>
        <span>手机号：13555555555</span><br><br>
        <span>自我介绍：</span>
        <div class="person_introduce">dadasdfdsa帝国宪法精神是德国撒啊啊啊啊啊啊啊啊啊啊的撒烦烦烦烦烦烦烦烦烦方法</div>
      </div>
      <div class="avatar" >
          <img src="https://img2.baidu.com/it/u=2421505363,3507499484&fm=26&fmt=auto&gp=0.jpg " alt="">
      </div>
      <div style="width:1px;height:500px;background-color:#fff; margin-left:30px"></div>

      <!-- 右侧快捷列表 -->
      <el-scrollbar height="470px">
        <p class="item" v-for="(p,index) in 20" :key='p.id'>{{index}}--laowang</p>
      </el-scrollbar>
  </div>

</template>

<script>
export default {
      data() {
        return {
         
        }
      }
    }
</script>

<style lang='scss' scoped>
    .personal{
        display: flex;
        // justify-content: space-between;
        width: 1180px;
        padding: 20px;
        color: #fff;
        .introduce{
            width: 500px;
            span{
                position: relative;
                top: 10px;
            }
        }
        
        .person_introduce{
            position: relative;
            top: -15px;
            left: 90px;
            width: 300px;
            height: 150px;
            line-height: 30px;
        }
        .avatar{
            margin-right: 50px;
            img{
                width: 150px;
                height: 150px;
            }
        }
        .el-scrollbar{
            width: 350px;
            margin-left: 60px;
            .item{
                // width: 200px;
                height: 50px;
                line-height: 50px;
                margin: 0;
                margin-right: 30px;
                padding-left: 10px;
                border-bottom: #fff solid 1px;
                &:hover{
                    background-color: rgb(160, 160, 160);
                }
            }
        }
        
        
    }
</style>