'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require("../models/user");
var jwt = require('jsonwebtoken');

const should = chai.should();
chai.use(chaiHTTP)

describe('users', function(){
  User.collection.drop();

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    // User.collection.drop();
    done();
  });
  //REGISTER
  it('should add a SINGLE user on /api/users/register POST', function(done){
    chai.request(server)
    .post('/api/users/register')
    .send({'email': 'gabon@gabon.com', 'password': '123'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('DATA');
      res.body.should.have.property('TOKEN');
      res.body.DATA.should.be.a('object');
      res.body.TOKEN.should.be.a('string');
      res.body.DATA.should.have.property('email');
      res.body.DATA.email.should.equal('gabon@gabon.com');
      done();
    });
  });
  let token = ''
  //LOGIN
  it('should return a 200 response if the user is logged in', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': 'gabon@gabon.com', 'password': '123'})
    .end(function(err, res){
      res.should.have.status(200);
      token = jwt.sign({data: res.body.DATA}, 'kukuhsecret', {expiresIn: 3600})
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('DATA');
      res.body.should.have.property('TOKEN');
      res.body.DATA.should.be.a('object');
      res.body.TOKEN.should.be.a('string');
      res.body.DATA.should.have.property('email');
      res.body.DATA.email.should.have.equal(res.body.DATA.email);
      done();
    })
  })

  it('check validation token', function(done){
    chai.request(server)
    .post('/api/users/check')
    .send({token: token})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('valid');
      res.body.valid.should.be.a('boolean');
      done();
    })
  })



});
