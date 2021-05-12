<template>
  <div id="cart-list">
    <scroll class="cart-scroll" ref="scroll">
        <cart-list-item
          v-for="(item,index) in $store.state.cartList"
          :key="index"
          :item="item"
          ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import cartListItem from './cartListItem'
  // import {mapGetters} from 'vuex'
    export default {
        name: "cartList",
        components:{
          cartListItem,
          Scroll,
          // mapGetters
        },
      // computed:{
      //     ...mapGetters(['cartList'])
      // }
      activated(){
          this.$refs.scroll.refresh
      }
    }
</script>

<style scoped>
  .cart-list{
    /*background-color: red;*/
  }
  .cart-scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
