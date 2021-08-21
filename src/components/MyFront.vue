<template>
  <h1><slot></slot></h1>
</template>

<script>
export default {

}
</script>

<style>

        h1 {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-size: 80px;
            text-align: center;
            color: white;
            line-height: 500px;
            font-family: Arial, Helvetica, sans-serif;
            text-shadow:0 0 20px #7925c9;
        }

             h1::after {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            content: attr(data-text);
            filter: blur(5px);
            z-index: -1;
        }
    </style>
