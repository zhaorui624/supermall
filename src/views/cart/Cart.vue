<template>
  <div class="cart">
<!-- 顶部导航栏-->
    <nav-bar class="nav-bar">
      <div slot="nav-center">购物车({{length}})</div>
    </nav-bar>
<!--  中间显示栏-->
    <cart-list/>
<!--  底部展示结算封装-->
    <cart-bottom/>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import cartList from './childComp/cartList';
  import cartBottom from './childComp/cartBottom'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      cartList,
      cartBottom
    },
    computed:{
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{

}
  .nav-bar{
    position: relative;
    top:0;
    background-color: var(--color-tint);
  }
</style>
