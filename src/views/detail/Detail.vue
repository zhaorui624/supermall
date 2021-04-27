<template>
<div>
  <detail-nav-bar/>
  <detail-swiper :top-images="topImages"/>
  <detail-base-info :goods="goods"/>
</div>
</template>

<script>
  //普通组件
  import DetailNavBar from './childComp/DetailNavBar'
  import DetailSwiper from './childComp/DetailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'
  //方法
  import {getDetail,Goods} from "../../network/detail";

  export default {
        name: "Detail",
      components: {
          //普通组件
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods:null
          }
        },
      created(){
          //1.保存传入的id
          this.iid = this.$route.params.iid
          //根据返回的iid请求数据
          getDetail(this.iid).then(res=>{
            const data = res.result
            console.log(res)
            //1.轮播图信息
            this.topImages = data.itemInfo.topImages
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services )
          })
      }
    }
</script>

<style scoped>

</style>
