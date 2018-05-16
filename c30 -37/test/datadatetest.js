'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Datadate = require("../models/datadate");

const should = chai.should();
chai.use(chaiHTTP)

describe('datadates', function(){
  Datadate.collection.drop();

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    done();
  });

  it('add add add add add', function(done){
    var datadate = new Datadate({
      letter: "G",
      frequency: 3.3
    })
    datadate.save(function(err, data){
      chai.request(server)
      .post('/api/datadate')
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.success.should.be.a('boolean')
        res.body.message.should.be.a('string')
        res.body.data.should.be.a('object')
        done();
      })
    })
  })

  it('search search search search', function(done){
    chai.request(server)
    .post('/api/datadate/search')
    .send({letter: "G", frequency: 3.3})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array')
      done()
    })
  })

  it('read read read read read', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array');
      done()
    })
  })
  it('edit edit edit edit edit', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .put('/api/datadate/'+ res.body[0]._id)
      .send({letter: "G"})
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        done()
      })
    })
  })

  it('findById findbyId findbyid', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .get('/api/datadate/' + res.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        done();
      })
    })

  it('delete delete delete delete', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .get('/api/datadate/' + res.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.propoerty('data')
        done()
      })
    })
  })

  })




})
