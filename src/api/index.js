import {
  get,
  post
} from "@/api/http.js";



//查询书籍
export const getBookList=(current)=>get(`/getBookList?current=`+current);
export const getSortList=()=>get(`/getSortList`);
export const getBookRankList=()=>get(`/getBookRankList`);
export const selectBook=(condition)=>get(`/selectBook?condition=`+condition);
export const getBookListByCode=(bookCode)=>get(`/getBookListByCode?bookCode=`+bookCode);
export const getBookListByShopCode=(shopCode,current)=>get(`/getBookListByShopCode?shopCode=`+shopCode+'&current='+current);
export const getBookListBySort=(sortName)=>get(`/getBookListBySort?sortName=`+sortName);
export const gatCarList=(userCode)=>get(`/gatCarList?userCode=`+userCode);
export const delCarByCarCode=(params)=>post(`/delCarByCarCode`,params);
export const updateUser=(params)=>post(`/updateUser`,params);
export const updateUser1=(params)=>post(`/updateUser1`,params);
export const getAddressList=(userCode)=>get(`/getAddressList?userCode=`+userCode);
export const login=(params)=>post(`/login`,params);
export const shopLogin=(params)=>post(`/shopLogin`,params);
export const adminLogin=(params)=>post(`/adminLogin`,params);
export const addAddress=(params)=>post(`/addAddress`,params);
export const setAddress=(params)=>post(`/setAddress`,params);
export const delAddress=(params)=>post(`/delAddress`,params);
export const getOrderList=(userCode)=>get(`/getOrderList?userCode=`+userCode);
export const addBook=(params)=>post(`/addBook`,params);
export const updBook=(params)=>post(`/updBook`,params);
export const delBookByCode=(params)=>post(`/delBookByCode`,params);
export const updBookShop=(params)=>post(`/updBookShop`,params);
export const changeShopPassword=(params)=>post(`/changeShopPassword`,params);
export const getOrderListByShopCode=(shopCode)=>get(`/getOrderListByShopCode?shopCode=`+shopCode);
export const getUserList=(current)=>get(`/getUserList?current=`+current);
export const getShopList=(current)=>get(`/getShopList?current=`+current);
export const delUserByUserCode=(params)=>post(`/delUserByUserCode`,params);
export const delShopByShopCode=(params)=>post(`/delShopByShopCode`,params);
export const updShopByShopCode=(params)=>post(`/updShopByShopCode`,params);
export const updPicByUserCode=(params)=>post(`/updPicByUserCode`,params);
export const addBookToCar=(params)=>post(`/addBookToCar`,params);
export const register=(params)=>post(`/register`,params);
export const shopRegister=(params)=>post(`/shopRegister`,params);
export const updadd=(params)=>post(`/updadd`,params);
export const getBookTopByShopCode=(shopCode)=>get(`/getBookTopByShopCode?shopCode=`+shopCode);
export const getSortTopByShopCode=(shopCode)=>get(`/getSortTopByShopCode?shopCode=`+shopCode);
export const getMoRenAddressByUserCode=(userCode)=>get(`/getMoRenAddressByUserCode?userCode=`+userCode);
export const getShopListShenHe=()=>get(`/getShopListShenHe`);
export const getBookShopByCode=(shopCode)=>get(`/getBookShopByCode?shopCode=`+shopCode);
export const carapy=(params)=>post(`/alipay/order`,params);
export const insertOrder=(params)=>post(`/insertOrder`,params);
export const updShopExistByShopCode=(params)=>post(`/updShopExistByShopCode`,params);
export const updMemberTimeByBookCode=(params)=>post(`/updMemberTimeByBookCode`,params);
export const updPasswordByCode=(params)=>post(`/updPasswordByCode`,params);
export const addSort=(params)=>post(`/addSort`,params);
export const delSort=(params)=>post(`/delSort`,params);
export const updsrcByOrderCode=(params)=>post(`/updsrcByOrderCode`,params);
export const updStateByOrderCode=(params)=>post(`/updStateByOrderCode`,params);


