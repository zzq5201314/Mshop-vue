/*
 * @Author: 清羽
 * @Date: 2022-09-16 16:06:42
 * @LastEditTime: 2022-10-24 21:59:53
 * @LastEditors: you name
 * @Description: 
 */
const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  shoppingCartNum: state => state.user.shoppingCartNum,
  avatar: state => state.user.avatar,
  invokedApp: state => state.innerWH.invokedApp,
  invokedPC: state => state.innerWH.invokedPC,
}
export default getters
