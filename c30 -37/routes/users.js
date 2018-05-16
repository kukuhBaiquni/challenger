var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var passport = require('passport')

/* GET users listing. */
router.post('/register', function(req, res, next) {
  let email = req.body.email
  let password = req.body.password
  let retrypassword = req.body.retrypassword

  const newUser = new User({email, password})
  newUser.save(function(err, user){
    res.json({'DATA': {email: user.email},
    'TOKEN': ''})
  })
})

router.post('/login', function(req, res, next){
  let email = req.body.email
  let password = req.body.password
  if(!email || !password){
    redirect('/login')
  }

  User.findOne({email}, function(err, user){
    let token = jwt.sign({user: user}, 'kukuhsecret', {expiresIn: 3600})
    user.update({$set : {token:token}}).exec(function(err, dapat){
      return res.status(200).json({'DATA' : {
        email: user.email
      },
      'TOKEN': token});
    })
  })
})


router.post('/check', function(req, res, next){
  jwt.verify(req.body.token, 'kukuhsecret', function(err, dapat){
    if (err) {
      res.json({valid: false})
    }else{
      res.json({valid: true})
    }
  })
})

router.get('/destroy', function(req, res, next){
  let email = req.session.user.email;
  User.findOne({email}, function(err, ready){
    ready.update({$set : {token: ''}}).exec(function(err, dapat){
      req.session.destroy(function(err){
        return res.status(200).json({logout : true})
      })
    })
  })
})
module.exports = router;
