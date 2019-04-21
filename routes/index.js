var express = require('express');
var serviceRes = require('../services/register')
var serviceLog = require('../services/login')
var serviceHome = require('../services/home')
var router = express.Router();
var restrict = require('../middleware/restrict')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var lstProduct = await serviceHome.getProducts();
  res.render('index', { products: lstProduct, user: req.session.isLogged?req.session.user:null});
});

router.get('/login', restrict, function(req, res) {
  res.render('login.ejs',{wrongUsername:false, wrongPass : false})  
});

router.get('/register',restrict ,function(req, res, ) {
      res.render('register.ejs',{isExist : false})  
});

router.post('/register', async function(req, res) {
  // let _user = await service.register(req.body)
  // console.log(_user);
  serviceRes.register(req.body).then(_user =>{
    if(!_user){
      res.render('register.ejs',{isExist : true}) 
    }
    req.session.user = _user;
    req.session.isLogged = true;
    res.redirect('/')
  })  
});

router.post('/login', async function(req, res) {
  // let _user = await service.register(req.body)
  // console.log(_user);
  serviceLog.login(req.body).then(_user =>{
    console.log("------", _user);
    if(!_user.wrongPass && !_user.wrongUsername){
      req.session.user = _user;
      req.session.isLogged = true;
      res.redirect('/')
    }
    
    if(_user.wrongUsername){
      res.render('login.ejs',{wrongUsername : true, wrongPass: false}) 
    }
    else if(_user.wrongPass){
      res.render('login.ejs',{wrongUsername: false, wrongPass: true})
    }
    
  })  
});

/* */
router.get('/logout', function(req, res) {
  // req.session.isLogged = false;
  // req.session.user = null;
  req.session.destroy(()=>{
    
  })
  res.redirect('/login')  
});

module.exports = router;
