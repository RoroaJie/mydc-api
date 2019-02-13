/**
 * 菜品类别相关
 */
// 创建路由器
const  express=require('express');
const  pool=require('../../pool');
var router=express.Router();
module.exports=router;

/*
*GET /admin/category     
*含义：客户端获取所有的菜品类别，按编号升序排列
*返回值形如：
*  [{cid: 1, cname: '..'}, {...}]
*/
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM mydc_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

/*
*API:  DELETE /admin/category/:cid
*含义：根据表示菜品编号的路由参数，删除该菜品
*返回值形如：
*  {code: 200, msg: '1 category deleted' }
*  {code: 400, msg: '0 category deleted' }
*/
router.delete("/:cid",(req,res)=>{
    pool.query("DELETE FROM mydc_category WHERE cid=?",req.params.cid,(err,result)=>{
        if(err) throw err;
        // console.log(req.params.cid);
        if(result.affectedRows>0){
            res.send({code:200,msg:'1 category deleted'})
        }else{
            res.send({code:400,msg:'0 category deleted'})
        }
    })
})

/*
*API:  POST /admin/category  
*请求参数：{cname:'xxx'}
*含义：添加新的菜品类别   
*返回值形如：
*  {code: 200, msg: '1 category added', cid: x }
*/
router.post("/",(req,res)=>{
    var data=req.body;
    console.log(data);
    pool.query('INSERT INTO mydc_category SET ?',[data] ,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({code:1,msg:'1 category added'});
    })
})
/*
*API:  PUT /admin/category
*请求参数：{cid: xx, cname:'xxx'}
*含义：根据菜品类别编号修改该类别
*返回值形如：
*  {code: 200, msg: '1 category modified' }
*  {code: 400, msg: '0 category modified, not exists' }
*  {code: 401, msg: '0 category modified, no modification' }
*/