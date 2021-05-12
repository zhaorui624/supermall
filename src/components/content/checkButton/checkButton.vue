<template>
    <div class="item-check">
      <div class="check-box" :class="{checked:isChecked }"></div>
    </div>
</template>

<script>
    export default {
        name: "checkButton",
        props:{
          isChecked:Boolean
      },
      data(){
          return {}
      }
    }
</script>

<style scoped>
  .item-check{
    width: 1.2rem;
  }
  .check-box{
    position: relative;
  }
</style>
