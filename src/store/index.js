import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";
import getters from './getters'
//1.注册
Vue.use(Vuex);
const state = {
  cartList:[],
}
//2.使用
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
//3.导出挂载到Vue的实例上
export default store
