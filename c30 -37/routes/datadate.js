var express = require('express');
var router = express.Router();
var Datadate = require('../models/datadate');
var jwt = require('jsonwebtoken');

//SEARCH/BROWSE
router.post('/search', function(req, res, next){
  let sletter = req.body.sletter;
  let sfrequency = req.body.sfrequency;

  Datadate.find({$or: [{letter: sletter}, {frequency: sfrequency}]}, function(err, response){
    if (err) {
      console.log(err);
      res.json({message : 'specified data is not found'})
    }
    res.json(response)
    console.log(response);
  })
})

//ADD
router.post('/', function(req, res, next){
  let addletter = req.body.addletter
  let addfrequency = req.body.addfrequency;

  const newDatadate = new Datadate({letter:addletter, frequency:addfrequency})
  newDatadate.save(function(err, data){
    return res.status(200).json({
      success : true,
      message : 'data have been added',
      data : data
    })
  })
})

//READ
router.get('/', function(req, res, next){
  Datadate.find(function(err, data){
    let daftar = {};
    res.json(data)
  })
})

//UPDATE
router.put('/:id', function(req, res, next){
  let id = req.params.id;

  Datadate.findByIdAndUpdate(id, {$set: {letter: req.body.updtletter, frequency: req.body.updtfrequency}}, function(err, response){
      res.json({
      success : true,
      message : 'data have been updated',
      data : response
    })
  })
})

//DELETE
router.delete('/:id', function(req, res){
  let id = req.params.id;
  Datadate.findByIdAndRemove(id, function(err, response){
      res.json({
      success : true,
      message : 'data have been deleted',
      data : response
    })
  })
})

//FIND BY ID
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Datadate.findById(id, function(err, response){
      res.json({
      success : true,
      message : 'data found',
      data : response
    })
  })
})

module.exports = router;
