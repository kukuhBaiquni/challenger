var express = require('express');
var router = express.Router();
var Data = require('../models/data');
var jwt = require('jsonwebtoken');

//SEARCH/BROWSE
router.post('/search', function(req, res, next){
  let sletter = req.body.sletter;
  let sfrequency = req.body.sfrequency;

  Data.find({$or: [{letter: sletter}, {frequency: sfrequency}]}, function(err, response){
    if (err) {
      res.json({message : 'specified data is not found'})
    }
    res.json(response)
  })
})
//ADD
router.post('/', function(req, res, next){
  let addletter = req.body.addletter;
  let addfrequency = req.body.addfrequency;

  const newData = new Data({letter:addletter, frequency:addfrequency})
  newData.save(function(err, data){
    return res.status(200).json({
      success : true,
      message : 'data have been added',
      data : data
    })
  })
})
//READ
router.get('/', function(req, res, next){
  Data.find(function(err, data){
    res.json(data)
  })
})

//UPDATE
router.put('/:id', function(req, res, next){
  let id = req.params.id;

  Data.findByIdAndUpdate(id, {$set: {letter: req.body.updtletter, frequency: req.body.updtfrequency}}, function(err, response){
    if (err) {
      res.json({message : 'specified data is not found'})
    }
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
  Data.findByIdAndRemove(id, function(err, response){
    if (err) {
      res.json({message : 'specified data is not found'})
    }
    res.json({
      success : true,
      message : 'data have been deleted',
      data : response
    })
  })
})

router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Data.findById(id, function(err, response){
    if (err) {
      res.json({message : 'specified data is not found'})
    }
    res.json({
      success : true,
      message : 'data found',
      data : response
    })
  })
})

module.exports = router;
