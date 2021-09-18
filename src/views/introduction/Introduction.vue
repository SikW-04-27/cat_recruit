<template>
  
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>

import Works from './children/Works.vue'
import Banner from './children/Banner.vue'
import Recruit from './children/Recruit.vue'
import Life from './children/Life.vue'
import Outline from './children/Outline.vue'
import { onMounted } from 'vue'
import {useRouter} from 'vue-router'

export default {
  components: {
    Banner,
    Works,
    Recruit,
    Life,
    Outline
  },
  setup(){
    // const router = useRouter();
    const router = useRouter()
    onMounted(()=>{
      console.log(2131234214);
      router.push({
        path:'/introduction/banner'
      })
    })
  }
};
</script>

<style  lang="scss">
::-webkit-scrollbar{
  display: none;
}

.content {
  width: 1200px;
  margin: 0 auto;
}

</style>