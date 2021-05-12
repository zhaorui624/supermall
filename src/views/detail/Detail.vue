<template>
<div id="detail">
  <detail-nav-bar  class="detail-nav" @titleClick="titleClick"/>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"/>
    <detail-param-info  ref="param" :param-info="paramInfo"/>
    <detail-comment-info  ref="comment" :comment-info="commentInfo"/>
    <good-list ref="recommend" :goods="recommendInfo"/>
  </scroll>
  <back-top v-show="isShowTop" @click.native="backClick"/>
  <detail-bottom-bar @addCart="addToCart"/>
</div>
</template>

<script>
  //普通组件
  import DetailNavBar from './childComp/DetailNavBar'
  import DetailSwiper from './childComp/DetailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'
  import DetailShopInfo from './childComp/DetailShopInfo'
  import DetailGoodsInfo from './childComp/DetailGoodsInfo'
  import DetailParamInfo from './childComp/DetailParamInfo'
  import DetailCommentInfo from './childComp/DetailCommentInfo'
  import DetailBottomBar from './childComp/DetailBottomBar'
  //可复用组件
  import Scroll from 'components/common/scroll/Scroll'
  //当前项目可复用的组件
  import GoodList from 'components/content/goods/GoodList'
  import BackTop from "../../components/content/backTop/BackTop";
  //方法
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";
  import {debounce} from "../../../common/utils";
  import {backTopMinXin} from "../../../common/minxin";

  export default {
        name: "Detail",
      components: {

          //普通组件
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          DetailBottomBar,
          //可复用组件
          Scroll,
        //当前项目可复用的组件
          GoodList,
          BackTop,
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendInfo:[],
            themeTopY:[],
            getThemeTopY:null
          }
        },
      created(){
          //1.保存传入的id
          this.iid = this.$route.params.iid
          //2.根据返回的iid请求详情数据
          getDetail(this.iid).then(res=>{
            const data = res.result
            console.log(res)
            //1.轮播图信息
            this.topImages = data.itemInfo.topImages
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services )
            //3.获取商家信息
            this.shop = new Shop(data.shopInfo)
            //4.获取商品的详细信息
            this.detailInfo = data.detailInfo
            //5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //6.获取评论信息
            if(data.rate.cRate !== 0){
              this.commentInfo = data.rate.list[0]
            }
          })
           //3.请求推荐数据
          getRecommend().then(res=>{
              this.recommendInfo = res.data.list
              console.log(res);
          })
            //4.获取getThemeTopY
         this.getThemeTopY = debounce(()=>{
            this.themeTopY = []
            this.themeTopY.push(0);
            this.themeTopY.push(this.$refs.param.$el.offsetTop)
            this.themeTopY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
             console.log(this.themeTopY)
        },50)
      },
    mixins:[backTopMinXin],
    methods:{
          imageLoad(){
            this.$refs.scroll.refresh();
            this.getThemeTopY()
          },
          titleClick(index){
            this.$refs.scroll.scrollTo(0,this.themeTopY[index],100)
            // console.log(index);
          },
          addToCart(){
            //1.获取商品信息
            const product = {}
            product.iid = this.iid;
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice
            //2.将商品添加到购物车
            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
          }

       }
    // mounted(){
    //       const refresh = debounce(this.$refs.scroll.refresh,50)
    //       this.$bus.$on('imageLoad',()=>{
    //         refresh()
    //       })
    // }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
