var express = require('express');
var router = express.Router();
const db = require('../models');
const users = db.users;
const product = db.products;

var restrict = require('../middleware/restrictlogin');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {

    const dir = './public/images/';
    mkdirp(dir, err => cb(err, dir))
  },
  filename: function(req, file, cb) {
    var name = file.originalname;
    cb(null, name);
  }
})

var upload = multer({
  storage: storage
});

/* GET users listing. */
router.get('/', restrict, function(req, res, next) {
  res.render('profile.ejs')
});
router.get('/upload-product',function(req,res){
  res.render('upload-product');
});
router.post('/uploadAvatar',upload.single('photos'),function(req,res){
  console.log(req.file);
  let nameImage = req.file.filename
  users.update({
    avatar: nameImage
    },
    {
      where:{
        username: req.session.user.username
      }
    } 
  ).then(()=>{
    req.session.user.avatar = nameImage
    res.redirect('/profile')
  })
});

router.post('/upload',upload.single('photos'),function(req,res){
  console.log(req.file);
  let nameImage = req.file.filename
  product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: nameImage
  }).then(()=>{
    res.redirect('/profile/upload')
  })
});
module.exports = router;
