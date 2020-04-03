// const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

// module.exports = router

var express = require('express');
var router = express.Router();
var path = require('path');
var isuser  = require('../middlewares/is-user');
var indexController=require('../controller/indexController')
/* GET home page. */

router.get('/index', isuser,function(req, res, next) {
  // res.redirect('/login')
    res.sendFile(path.join(__dirname, '../public/dist/', 'index.html'));
});

router.get('/admin', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/dist/', 'admin.html'));
});
router.get('/show/:author/:id', indexController.showSSR);
// router.get('/show/:author/:id',);
router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/dist', 'login.html'));
});
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/dist', 'register.html'));
});
module.exports = router;
