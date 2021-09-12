<template>
<div id="life-content"><IntroductionTitle>工作室日常</IntroductionTitle>
     <div class="studio-happy">
      <img src="../../../assets/img/happy1.jpg" alt="" />
      <img src="../../../assets/img/happy2.jpg" alt="" />
      <img src="../../../assets/img/happy3.jpg" alt="" />
      <img src="../../../assets/img/happy4.jpg" alt="" />
    </div></div>

</template>


<script>

import IntroductionTitle from '../../../components/IntroductionTitle.vue'
export default {
    name: 'Life',
    components: {
        IntroductionTitle
    }
}
</script>

<style lang="scss">

#life-content {
  margin-top: 30px;
  padding: 30px 120px;
  height: 500px;
  background-color: rgba(0, 0, 0, .5);
}

.studio-happy {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 25px;
  padding-bottom: 50px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
}

</style>