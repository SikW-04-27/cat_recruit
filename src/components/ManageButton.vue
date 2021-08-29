<template>
   <button id="introductin-title" class="myButton"><slot></slot></button>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import "../assets/scss/button.scss";
.myButton{
    padding: 10px;
}

</style>