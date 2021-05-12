import {ADD_COUNTER,ADD_TO_CART} from "./mutations_type";
export default {
  addCart(context,payload){
    // state.cartList.push(payload);
    //1.查找之前数组是否有该商品
    let oldProduct = context.state.cartList.find(item=>item.iid === payload.iid)
    //2.判断oldProduct
    if(oldProduct){
      // oldProduct.count += 1
      //有的话
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      {
        //没有的话
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
      }
    }
  }
}
