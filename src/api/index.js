/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import ajax from'./ajax';
import {message} from 'antd';
import jsonp from 'jsonp';
// export function reqLogin(username,password){
//     return ajax('./login',{username,password},'POST');
// }
export const reqLogin=(username,password)=>ajax('./login',{username,password},'POST');
export const reqAddUser=(user)=>ajax('./manage/user/add',user,'POST');
export const reqWeather=(resolve,city)=>{
    return new Promise((resolve, reject) => {
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url,{},(err,data)=>{
            console.log(data);
            if(!err&&data.status==='success'){
                const {dayPictureUrl,weather}=data.results[0].weather_data[1];
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气失败');
            }
        })
    });
};
//reqWeather('','北京');
// 获取一级或某个二级分类列表
export const reqCategorys=(parentId)=>ajax('/manage/category/list',{parentId});
//添加分类
export const reqAddCategory=(parentId,categoryName)=>ajax('/manage/category/add',
    {parentId,categoryName},'POST');
//更新分类
export const reqUpdateCategory=({categoryId,categoryName})=>ajax('/manage/category/update',
    {categoryId,categoryName},'POST');

export const reqProduct=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize});
export const reqSearchProduct=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',{
    [searchType]:searchName,
    pageNum,
    pageSize
});
export const reqCategate=(categoryId)=>ajax('/manage/category/info',{categoryId});

export const reqUpdateStatus=(productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'POST');
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax( '/manage/img/delete', {name}, 'POST')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */