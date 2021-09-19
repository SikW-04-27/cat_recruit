<template>
<div class="big_block">
    <router-view></router-view>
</div>
    
</template>

<script>
    import Login from './children/Login.vue'
    import Register from './children/Register.vue'
    import {onUnmounted,ref} from 'vue'
    export default {
        components: {
            Login,
            Register
        },
        setup(props) {
            
            onUnmounted(() => {
            location.reload();
            });
        }
    }
</script>

<style lang='scss'>
    .big_block{
    display: flex;
    }
    .login_block{
    width: 800px;
    height: 500px;
    margin:100px auto;
    display: flex;
    position: relative;
    transition: 1s;
    
    .login_left{
        // background-image: url('../../assets/img/loginBG.jfif');
        background-size: cover;
        width: 440px;
        height: 100%;
        left: 150px;
        background-color: rgb(149, 186, 168);
        position: relative;
        text-align: center;
        transition: 1s ease-in;
        z-index: 1;
        box-shadow: -3px 3px 4px rgba(190, 190, 190, 0.699);
        border-radius: 10px;
        .left_logo{
        width: 80px;
        margin: 10px auto;
        }
        .left_h2{
        font-size: 26px;
        font-weight: 600;
        text-align: center;
        margin-top: 0px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        z-index: 10;
        color: rgb(255, 255, 255);
        }
        .left_button{
        position: relative;
        // top: 15px;
        transition: 1s;
        width: 130px;
        height: 35px;
        font-size: 23px;
        margin: 20px auto;
        font-weight: 600;
        font-family:  Verdana;
        background-color: #fff;
        box-shadow: 3px 3px 10px rgba(117, 117, 117, 0.733);
        cursor: pointer;
        animation: button 1s alternate infinite;
        color: rgb(149, 186, 168);
        border-radius: 5px;
        }
        @keyframes button {
        from{
            top: 15px;
        }
        to{
            top: 10px;
        }
        }
        .left_img_1{
        position: absolute;
        width: 300px;
        bottom: 10px;
        left: 50px;
        }
    }
    .login_left_after{
        left: 0px;
        box-shadow: rgb(212 212 212 / 45%) -10px 8px 4px;
        border-radius: 0px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .login_right{
        position: absolute;
        transition: 1s ease-in;
        left: 220px;
        width: 360px;
        height: 100%;
        background-color: rgba(215, 97, 47, 0.788);
        box-shadow:rgb(212 212 212 / 45%) -10px 8px 4px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow: hidden;
        .triangle{
            width: 0;
            border: 80px solid black;
            border-right: 80px solid transparent;
            border-bottom: 80px solid transparent;
            border-left: 80px solid transparent;
            border-bottom-right-radius: 10px;
            position: absolute;
            right: -80px;
            bottom: -80px;
            transform: rotate(-45deg);
            cursor: pointer;
            border-color: rgb(240, 234, 224) transparent transparent;
        }
        .triangle_text{
            position: absolute;
            bottom: 0;
            right: 0;
            line-height: 60px;
            width: 70px;
            height: 60px;
            color: #826d6d;
            cursor: pointer;
            font-weight: 600;
        }
    }
    .login_right_after{
        left: 440px;
    }
    }
    #student-login,#student-register {
    width: 360px;
    height: 350px;
    padding-top: 40px;
    color: #fff;
    text-align: center;
    /* background-color: blue; */
    input{
        width: 250px;
        height: 45px;
        border-radius: 30px;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        margin-top: 20px;
        letter-spacing: 2px;
        padding-left: 8px;
        color: black;
        background-color: rgba(255, 255, 255, .7) !important;
        &::placeholder {
        color: #fff;
        letter-spacing: 0;
        }
    }

    span{
        font-size: 14px;
        position: absolute;
        left: 30px;
        margin-top: 15px;
        cursor: pointer;
    }



    .login-words {
        position: relative;
        top: 0;
        left: 0;
        // margin-bottom: 5px;
        // color: #fff;
        font-size: 25px;
        font-weight: 600;
        letter-spacing: 4px;
        // color: skyblue;
        // text-shadow: rgb(255 255 255 / 36%) 0px 0px 9px;
        color: #776868;
        font-weight: 600;  
        }
        input{
        background-color: rgb(240 234 224) !important;
        color: #826d6d;
        &::placeholder{
            color: #826d6d;
        }
        }
    .student-login-tips {
        height: 40px;
        color: #fff;
        line-height: 40px;
        transition: all 1s;
    }

    .skip-register {
        margin: 25px 0 0 250px;
        color: #fff;
        font-size: 14px;
    }

    #check-login,#check-register {
        margin: 40px auto 0;
        width: 250px;
        height: 45px;
        line-height: 45px;
        border-radius: 30px;
        padding-left: 8px;
        font-weight: 600;
        letter-spacing: 5px;
        background-color: rgb(240, 234, 224);
        color: rgb(130, 109, 109);
        // box-shadow: rgb(130 109 109 / 62%) 0px 15px 20px;
        box-shadow: 3px 3px 7px rgba(90, 90, 90, 0.452);
        cursor: pointer;
        &:hover {
            background-color: rgb(236, 230, 219);
            box-shadow: 3px 3px 7px rgba(80, 80, 80, 0.575);
        }
        &:active{
            background-color: rgb(224, 219, 208);
            box-shadow: 3px 3px 7px rgba(80, 80, 80, 0.719);
        }
        }
    }

</style>