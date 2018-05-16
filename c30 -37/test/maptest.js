'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Maps = require("../models/maps");

const should = chai.should();
chai.use(chaiHTTP)

describe('maps', function(){
  Maps.collection.drop();

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    done();
  });

  it('add add add add add add', function(done){
    var maps = new Maps({
      title: 'ITC',
      lat : 9.2910421,
      lng : 102.341423
    })

    maps.save(function(err, data){
      chai.request(server)
      .post('/api/maps')
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.success.should.be.a('boolean')
        res.body.message.should.be.a('string')
        res.body.data.should.have.property('_id')
        res.body.data.should.be.a('object')
        done();
      })
    })
  })

  it('search search search search', function(done){
    chai.request(server)
    .post('/api/maps/search')
    .send({title: 'ITC'})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array')
      done()
    })
  })

  it('read read read read', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array')
      done()
    })
  })

  it('edit edit edit edit edit', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .put('/api/maps/' + res.body[0]._id)
      .send({title: "ADC", lat: 14213, lng: 123213})
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('success')
        res.body.should.have.property('data')
        res.body.message.should.be.a('string')
        res.body.success.should.be.a('boolean')
        res.body.data.should.have.property('title')
        res.body.data.should.have.property('lat')
        res.body.data.should.have.property('lng')
        res.body.data.should.be.a('object')
        done()
      })
    })

    it('findbyid findbyid findbyid', function(done){
      chai.request(server)
      .get('/api/maps')
      .end(function(err, res){
        chai.request(server)
        .get('/api/maps/' + res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.should.be.json;
          res.body.should.have.property('success')
          res.body.should.have.property('message')
          res.body.should.have.propoerty('data')
          res.body.success.should.be.a('boolean')
          res.body.message.should.be.a('string')
          res.body.data.should.have.property('_id')
          res.body.data.should.have.property('title')
          res.body.data.should.have.property('lat')
          res.body.data.should.have.property('lng')
          res.body.data.should.be.a('object')
          done()
        })
      })
    })

    it('delete delete delete delete', function(done){
      chai.request(server)
      .get('/api/maps')
      .end(function(err, res){
        chai.request(server)
        .get('/api/maps/' + res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200)
          res.should.be.a.json;
          res.body.should.be.a('object')
          res.body.should.have.property('success')
          res.body.should.have.property('message')
          res.body.should.have.property('data')
          res.body.success.should.be.a('boolean')
          res.body.message.should.be.a('string')
          res.body.data.should.have.property('_id')
          res.body.data.should.have.property('title')
          res.body.data.should.have.property('lat')
          res.body.data.should.have.property('lng')
          res.body.data.should.be.a('object')
          done();
        })
      })
    })


  })
})
