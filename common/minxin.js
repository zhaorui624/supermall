// 回到顶部的混入封装
import BackTop from 'components/content/backTop/BackTop'
export const backTopMinXin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowTop:true
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    }
  }
}
