<template>
<transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInDown"
        leave-active-class="animate__fadeOutDown"
    >
    <div class="recruit-content" v-show="hide">
        <div class="card illustration_img" >
            <img src="../../../assets/img/illustration_11.png" alt="">
            <div class="content">
                <div class="content_title">
                    <div></div>
                    <h2>前端</h2>
                </div>
                <p>
                    前端负责界面实现以及业务逻辑实现，以优化用户体验为核心目的。HTML决定网页有哪些内容和板块，CSS决定网页中内容的样式，JavaScript用于控制网页的功能、与用户交互息息相关。
                </p>
            </div>
        </div>
        <div class="card illustration_img" style="animation-delay:0.5s">
            <img src="../../../assets/img/illustration_12.png" alt="">
            <div class="content ">
                <div class="content_title">
                    <div></div>
                    <h2>后台</h2>
                </div>
                
                <p>
                    后台开发，通常也称服务器端开发。主要负责业务逻辑功能模块，工作中处理前端的请求，进行逻辑处理和数据交互，现阶段的Web端、移动端等都需要后台技术的支持。
                </p>
            </div>
        </div>
        <div class="next" @click="next">
            <p>Learn More</p>
            <i class="el-icon-arrow-down"></i>
        </div>
    </div>

 </transition>

</template>

<script>
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
import IntroductionTitle from '../../../components/IntroductionTitle.vue'
export default {
    name: 'Recruit',
    setup(props) {
        let hide = ref(false)
        const router = useRouter()

        let next = function(){
            hide.value = false;
            setTimeout(() => {
                router.push({
                    path:'/introduction/life'
                })
            }, 500);
            
        }
        onMounted(()=>{
            hide.value = true
            
        })
        return {
            hide,
            next
        }
    }

}
</script>

<style lang="scss" scoped>




.recruit-content{
    // background-color: rgb(31, 31, 31);
    width: 1200px;
    height: 600px;
    margin-top: 10px;
    margin: 10px auto;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    // align-items: center;
    flex-wrap: wrap;
    .card{
        position: relative;
        width: 350px;
        height: 550px;
      background-color: rgba(90, 90, 90, 0.07);
        border-radius: 30px;
        overflow: hidden;
        margin-top: 50px;
        .content{
            padding: 15px;
            .content_title{
                width: 300px;
                padding-bottom: 10px;
                display: flex;
                div{
                    width: 4px;
                    height: 25px;
                    background: rgba(54, 90, 60, 0.747);
                    margin-right: 10px;
                    margin-top: 4px;
                }
                h2{
                    font-size: 20px;
                    font-weight: 600;
                    color: #444;
                }
            }
            
                p{
                    width: 330px;
                    color: rgba(83, 83, 83, 0.808);
                    font-weight: 600;
                }
        }
    }
    .next{
        position: absolute;
        bottom: -70px;
        color: yellowgreen;
        text-align: center;
        transition: 1s;
        cursor: pointer;
        font-weight: 600;
        font-family:fantasy;
        letter-spacing: 2px;
        p{
            font-size: 20px;
        }
        i{
            color: yellowgreen;
            font-size: 30px;
            font-weight: 600;
        }
        &:hover{
            bottom: -80px;
        }
    }
}

// .container .card{
//     position: relative;
//     width: 265px;
//     height: 330px;
//     color: #fff;
//     background-color: #111;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 20px 60px;
//     transition: .5s;
//     cursor: pointer;
// }
// .container .card:hover{
//     transform: translateY(-25px);
// }
// .container .card::before{
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(45deg,#ffbc00,#ff0058);
// }
// .container .card::after{
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(315deg,#03a9f4,#ff0058);
//     filter: blur(30px);
// }
// .container .card:nth-child(2):after,
// .container .card:nth-child(2):before{
//     background: linear-gradient(315deg,#4dff03,#00d0ff);
// }

// .container .card span{
//     position: absolute;
//     top: 5px;
//     left: 5px;
//     right: 5px;
//     bottom: 5px;
//     background-color: rgba(0,0,0,0.6);
//     border-radius: 5px;
//     z-index: 1;
// }
// .container .card span::before{
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 50%;
//     height: 100%;
//     background-color: rgba(255,255,255,0.1);
//     pointer-events: none;
// }
// .container .card .content{
//     z-index: 2;
//     position: relative;
//     padding: 20px 40px;
// }
// .container .card .content h2{
//     font-size: 2em;
//     color: #fff;
//     margin-bottom: 10px;
//     text-align: center;
// }
// .container .card .content p{
//     font-size: 0.95em;
//     color: #fff;
//     line-height: 1.6em;
//     margin-bottom: 10px;
// }
// .container .card .content a{
//     display: inline-block;
//     text-decoration: none;
//     color:#000;
//     background-color: #fff;
//     padding: 7px;
//     font-weight: 600;
//     border-radius: 5px;
// }

</style>