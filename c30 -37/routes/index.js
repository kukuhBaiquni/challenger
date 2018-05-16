var express = require('express');
var router = express.Router();
var passport = require('passport');
var moment = require('moment')
var forMenu = ''
/* GET home page. */


  router.get('/', function(req, res, next){
    forMenu = req.url;
    res.render('index', {url : {forMenu}})
  })

  router.get('/login', function(req, res, next){
    forMenu = req.url;
    res.render('login', {message: req.flash('loginMessage')})
  })

  router.get('/register', function(req, res, next){
    forMenu = req.url;
    res.render('register', {message: req.flash('registerMessage')})
  })


  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash : true
  }));

  router.post('/register', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash : true
  }));

  router.get('/home', isLoggedIn, function(req, res, next){
    forMenu = req.url;
    res.render('home', {user: req.user, url : {forMenu}})
  })

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login')
  })

  router.get('/data', function(req, res, next){
    forMenu = req.url;
    res.render('data', {url : {forMenu}})
  })

  router.get('/bar', function(req, res, next){
    res.render('bar')
  })

  router.get('/pie', function(req, res, next){
    res.render('pie')
  })

  router.get('/maps', function(req, res, next){
    forMenu = req.url;
    res.render('maps', {url : {forMenu}, moment : moment})
  })

  router.get('/map', function(req, res, next){
    res.render('map')
  })

  router.get('/menu', function(req, res, next){
    res.render('menu', {url : {forMenu}})
  })

  router.get('/datadate', function(req, res, next){
    forMenu = req.url;
    res.render('datadate', {url : {forMenu}})
  })

  router.get('/line', function(req, res, next){
    res.render('line')
  })

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
  return next();

  res.redirect('/');

}
module.exports = router;
