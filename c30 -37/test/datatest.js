'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Data = require("../models/data");

const should = chai.should();
chai.use(chaiHTTP)

describe('datas', function(){
  Data.collection.drop();

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    // Data.collection.drop();
    done();
  });

  it('add add add add add add', function(done){
    var data = new Data({
      letter : "K",
      frequency : 2.2
    })

    data.save(function(err, data){
      chai.request(server)
      .post('/api/data')
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.success.should.be.a('boolean')
        res.body.message.should.be.a('string')
        res.body.data.should.be.a('object')
        done()
      })
    })
  })

  it('search search search search', function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({letter: "K", frequency: 2.2})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array');
      done()
    })
  })

  it('read read read read read', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array');
      done()
    })
  })

  it('edit edit edit edit edit', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .put('/api/data/'+ res.body[0]._id)
      .send({'letter': "S"})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.should.have.property('frequency')
        done()
      })
    })
  })

  it('findById findById findById findById', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .get('/api/data/'+ res.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.should.have.property('frequency')
        done()
      })
    })
  })

  it('delete delete delete delete delete delete', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .get('/api/data/'+ res.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.should.have.property('frequency')
        done()
      })
    })
  })

})
