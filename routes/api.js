var jwt = require("jsonwebtoken")
var isuser  = require('../middlewares/is-user');
var isadmin = require('../middlewares/is-admin')
var userController=require('../controller/userController')
var designController=require('../controller/designController')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login',userController.login );
router.post('/register',userController.insert );
router.post('/saveDesign',isuser,designController.addNewDesign);
router.get('/getDesigns',isuser,designController.getDesigns);
router.get('/getView',designController.getDesignByAuthorAndId);

// app.post('/validate',function(req,res){
//     let token = req.headers.authorization;
//     // 验证token合法性 对token进行解码
//     jwt.verify(token,'abcd',function(err,decode){
//         if(err){
//             res.json({
//                 msg:'当前用户未登录'
//             })
//         }else {
//             // 证明用户已经登录
//             res.json({
//                 token:jwt.sign({username:decode.username},'abcd',{
//                     // 过期时间
//                     expiresIn:"60s"
//                 }),
//                 username:decode.username,
//                 msg:'已登录'
//             })
//         }
//     })
// })
module.exports = router;
