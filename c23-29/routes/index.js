var express = require('express');
var helpers = require('../helpers');
var moment = require('moment')
var router = express.Router();
var marker = {};

module.exports = function(pool){

  router.get('/login', function(req, res) {
    res.render('index');
    var d = new Date();
    var g = new Date()
    g.setDate(g.getDate()-5)

  });

  router.post('/login', function(req, res) {
    pool.query(`select * from users where email='${req.body.logemail}' and password='${req.body.logpass}'`, function(err, rows) {
      console.log(rows);
      if(rows.rows.length > 0){
        req.session.user = rows.rows[0]
        res.redirect('projects');
      }else{
        res.redirect('login');
      }
    })
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(err) {
      res.redirect('/login');
    })
  })


  router.get('/profile', function(req, res){
    pool.query(`select * from users where userid = ${req.session.user.userid}`, function(err, sending){
      if(err){
        res.redirect('/projects')
      }else{
        res.render('profile', {send : sending.rows[0]});
      }
    })
  })

  router.post('/profile', function(req, res, next) {
    let fulltime = req.body.type;
    if (fulltime == null) {
      fulltime = false
    }
    pool.query(`update users set password = '${req.body.password}', position = '${req.body.position}', type = ${fulltime} where userid = ${req.session.user.userid}`)
    res.redirect('projects');
  });

  router.get('/register', function(req, res, next) {
    res.render('register');
  });

  router.post('/register', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let position = req.body.position
    let fulltime = req.body.regtype;
    if (fulltime == null) {
      fulltime = false
    }
    let projectcolumns = {
      id : false,
      name : true,
      members : true
    }
    pool.query(`insert into users(email, password, firstname, lastname, position, type, projectcolumns) values ('${email}', '${password}', '${firstName}', '${lastName}', '${position}', ${fulltime}, '${JSON.stringify(projectcolumns)}')` , function(err, value){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    })
  });

  return router;

}
