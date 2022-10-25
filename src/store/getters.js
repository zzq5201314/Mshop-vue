/*
 * @Author: 清羽
 * @Date: 2022-09-16 16:06:42
 * @LastEditTime: 2022-10-25 23:12:54
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
  innerWidth: state => state.innerWH.innerWidth,
  invokedApp: state => state.innerWH.invokedApp,
  invokedPC: state => state.innerWH.invokedPC,
}
export default getters
