<template>
<div id="detail">
  <detail-nav-bar  class="detail-nav"/>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"/>
    <detail-param-info :param-info="paramInfo"/>
    <detail-comment-info :comment-info="commentInfo"/>
    <good-list :goods="recommendInfo"/>
  </scroll>
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
  //可复用组件
  import Scroll from 'components/common/scroll/Scroll'
  //当前项目可复用的组件
  import GoodList from 'components/content/goods/GoodList'
  //方法
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";

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
          //可复用组件
          Scroll,
        //当前项目可复用的组件
          GoodList
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
            recommendInfo:[]
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
      },
    methods:{
          imageLoad(){
            this.$refs.scroll.refresh();
          }
       }
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
