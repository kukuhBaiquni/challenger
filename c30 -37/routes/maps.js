var express = require('express');
var router = express.Router();
var Maps = require('../models/maps');
var jwt = require('jsonwebtoken');

//SEARCH/BROWSE
router.post('/search', function(req, res, next){
  let stitle = req.body.stitle;
  console.log(stitle);

  Maps.find({title: { $regex: '.*' + stitle + '.*' }}, function(err, response){
    if (err) {
      console.log(err);
      res.json({message : 'specified data is not found'})
    }
    res.json(response)
  })
})

//ADD
router.post('/', function(req, res, next){
  let addtitle = req.body.addtitle;
  let addlat = req.body.addlat;
  let addlng = req.body.addlng;

  const newMaps = new Maps({title:addtitle, lat:addlat, lng:addlng})
  newMaps.save(function(err, data){
    return res.status(200).json({
      success : true,
      message : 'data have been added',
      data : data
    })
  })
})

//READ
router.get('/', function(req, res, next){
  Maps.find({}, function(err, data){
    res.json(data)
  })
})

//UPDATE
router.put('/:id', function(req, res, next){
  let id = req.params.id;
  let updttitle = req.body.updttitle;
  let updtlat = req.body.updtlat;
  let updtlng = req.body.updtlng;

  Maps.findByIdAndUpdate(id, {$set: {title:updttitle, lat:updtlat, lng:updtlng}}, function(err, response){
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
  Maps.findByIdAndRemove(id, function(err, response){
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
//FIND BY ID
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Maps.findById(id, function(err, response){
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
