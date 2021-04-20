<template>
    <div class="goods-item">
      <img :src="goodsItem.show.img" alt="">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.collect}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodListItem",
        props:{
        goodsItem:{
          type:Object,
          default(){
            return {}
          }
        }
        }
    }
</script>

<style scoped>

</style>
