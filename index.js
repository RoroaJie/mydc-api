/**
 *  扫码点餐API子系统 
 */
const PORT=8090;
const express=require("express");
var app=express();
app.listen(PORT,()=>{
    console.log('服务器启动成功！');
})