<template>
<div>
  <nav-bar>
    <div slot="nav-left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="nav-center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active: index === currentIndex }"
           @click="titleClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
      components:{
          NavBar
      },
      data(){
          return{
            titles:['商品','参数','评论','推荐'],
            currentIndex: 0
          }
      },
      methods:{
          backClick(){
            this.$router.back()
          },
         titleClick(index){
            this.currentIndex = index
        }
      }
    }
</script>

<style scoped>
  .title{
  display: flex;
}
  .title-item{
    flex: 1;
  }
  .back img {
    margin-top:10px
  }
  .active{
    color: red;
  }
</style>
