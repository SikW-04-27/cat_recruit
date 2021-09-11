<template>
  <Banner />
  <div>121</div>
  <div id="content">
    <Outline />
    <Works />
    <Recruit />
    <Life />
  </div>
</template>

<script>
import Works from "./children/Works.vue";
import Banner from "./children/Banner.vue";
import Recruit from "./children/Recruit.vue";
import Life from "./children/Life.vue";
import Outline from "./children/Outline.vue";

export default {
  components: {
    Banner,
    Works,
    Recruit,
    Life,
    Outline,
  },
};
</script>

<style  lang="scss">
#content {
  margin: 0 auto;
  width: 100%;
  height: 1375px;
  color: #c2c2c2;
  font-size: 14px;
  border-radius: 10px;
  background-color: rgba(78, 78, 78, 0.5);
}

.studio-done p,
.studio-recruit p,
.studio-happy p {
  padding: 8px 0;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #fff;
}
</style>