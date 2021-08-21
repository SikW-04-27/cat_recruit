<template>
  <a href="javascript:" :style="newStyle" style=":hover {color: blue}"><slot></slot></a>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "MyButton",
  props: ['padding', 'color'],

  setup(props, context) {

      console.log(context);

      let newStyle = reactive({
          padding: props.padding,
          color: props.color
      })
    return {
      newStyle,
    };
  },
};
</script>


<style scoped lang="scss">
$color: skyblue;

a {
  position: relative;
  /* padding: 10px 30px; */
  color: $color;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
}

a:hover {
  background: $color;
  color: #111;
  box-shadow: 0 0 50px $color;
  transition-delay: 0.5s;
}

a::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid $color;
  border-left: 2px solid $color;
  transition: 0.5s;
  transition-delay: 0.5s;
}

a:hover::before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid $color;
  border-right: 2px solid $color;
  transition: 0.5s;
  transition-delay: 0.5s;
}

a:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
</style>