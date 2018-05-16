var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'crud22';

router.get('/', function(req, res, next) {

  mongo.connect(url, function(err, client){
    const db = client.db(dbName);
    let sestr = req.query.string;
    assert.equal(null, err);
    let query = {};

    if(req.query.cid && req.query.id){
      query['id'] = req.query.id
    }
    if(req.query.stringC && req.query.string){
      query['string'] = {$regex: '.*' + sestr + '.*' }};
    }
    if(req.query.integerC && req.query.integer){
      query['integer'] = req.query.integer;
    }
    if(req.query.floatC && req.query.float){
      query['float'] = req.query.float
    }
    if(req.query.dateC && req.query.date && req.query.date2){
      query['date'] = {
        $gte: req.query.date,
        $lt: req.query.date2
      }
    }
    if(req.query.booleanC && req.query.boolean){
      query['boolean'] = req.query.boolean;
    }
    console.log(query);
    db.collection('crud22').find(query).count((err, records)=>{
      let limit = 3;
      let count = records;
      let pages = Math.ceil(count / 3);
      let page = req.query.page || 1;
      let url2 = (req.url == '/') ? '/?page=1' : req.url;
      let offset = (page-1)*limit;
      db.collection('crud22').find(query).limit(limit).skip(offset).toArray((err, cari)=>{
        res.render('index', {
          data: cari,
          query : req.query,
          pagination: {
            page,
            pages,
            count,
            url2
          }
        })
      })
    })
  })
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res){//=================================add input
  let item = {
    string : req.body.string,
    integer : req.body.integer,
    float : req.body.float,
    date : req.body.date,
    boolean : req.body.boolean
  };

  mongo.connect(url, function(err, client){
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('crud22').insertOne(item)
  })
  res.redirect('/');
})

router.get('/delete/:id', function(req, res, next) {//======================DELETE
  mongo.connect(url, function(err, client){
    assert.equal(null, err);
    const db= client.db(dbName);
    db.collection('crud22').find().toArray((err, deleted)=>{
      console.log(deleted);
      for(let i=0; i<deleted.length; i++){
        if(deleted[i]._id == req.params.id){
          db.collection('crud22').deleteOne({_id: deleted[i]._id})
        }
      }
    })
  })
  res.redirect('/');
})

router.get('/edit/:id', function(req, res){//===============================edit
  mongo.connect(url, function(err, client){
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection('crud22').find().toArray((err, itemEdit)=>{
      for(let i=0; i<itemEdit.length; i++){
        if(itemEdit[i]._id == req.params.id){
          res.render('edit', {item : itemEdit[i]})
          break;
        }
      }
    })
  })
})

router.post('/edit/:id', function(req, res){//================================edit input
  mongo.connect(url, function(err, client){
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection('crud22').find().toArray((err, point)=>{
      for(let i=0; i<point.length; i++){
        if(point[i]._id == req.params.id){
          db.collection('crud22').updateMany({ _id: point[i]._id} ,
            { $set: { string: req.body.string,  integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean}})
          }
        }
      })
      res.redirect('/');
    })
  });

  module.exports = router;
