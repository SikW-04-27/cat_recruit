<template>
<IntroductionTitle>工作室日常</IntroductionTitle>
     <div class="studio-happy">
      <p>工作室日常</p>
      <img src="../../../assets/img/happy1.jpg" alt="" />
      <img src="../../../assets/img/happy2.jpg" alt="" />
      <img src="../../../assets/img/happy3.jpg" alt="" />
      <img src="../../../assets/img/happy4.jpg" alt="" />
    </div>
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

.studio-happy {
  img {
    height: 200px;
  }
}

</style>