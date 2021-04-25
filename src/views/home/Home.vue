<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="nav-center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                    ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
  </div>
</template>

<script>
  //可复用组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  //当前项目可复用组件
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from'components/content/goods/GoodList'
  import BackTop from 'components/content/backTop/BackTop'

  //普通组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import featureView from './childComps/featureView'
  //方法
  import {getHomeMultidata,getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components: {
      //可复用组件
      NavBar,
      Scroll,
      //当前项目可复用组件
      TabControl,
      GoodList,
      BackTop,
      //普通组件
      HomeSwiper,
      RecommendView,
      featureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
      destroyed(){
        console.log(destoryed);
      },
      activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$ref.scroll.refresh()
      },
      deactivated(){
        this.saveY = this.$refs.scroll.getScrollY()
      }
    },
    created() {
      // 1.请求多个数据
        this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    // mounted(){
    //   //1.图片加载完成的事件监听(防抖动)
    //   const refresh = debounce(this.$refs.scroll.refresh,50)
    //   this.$bus.$on('itemImageLoad',()=>{
    //     refresh()
    //   })
    // },
    methods:{
      //事件监听方法：
      tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
          //1.判断位置是否显示
          this.isShowBackTop = (-position.y)>1000
        //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      // 网络请求相关方法
     getHomeMultidata(){
       getHomeMultidata().then(res => {
         // this.result = res;
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
       })
     },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top:0;
    right: 0;
    left: 0;
    z-index: 9;
  }
  #home{
  padding-top: 44px;
  }
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  }
</style>
