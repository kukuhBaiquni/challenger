var express = require('express');
var router = express.Router();
var fs = require('fs');
let data = JSON.parse(fs.readFileSync('c19.json', 'utf8'));
let data2 = JSON.parse(fs.readFileSync('deleted.json', 'utf8'));
var getDelete = Array.from(data2);

router.get('/', function(req, res, next) {
  res.render('index', {data});
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res){
  let id = data.length+1;
  getDelete = Array.from(data2)
  if(data2.length>0){
    getDelete.sort();
    id=getDelete[0];
    function checkNum(data2){
      return data2 != getDelete[0];
    }
    data2 = data2.filter(checkNum);
    getDelete.shift();
    let deleted2 = JSON.stringify(data2, null, 3);
    let dataWrite5 = fs.writeFileSync('deleted.json', deleted2, function(err){
      if(err) throw err;
    })
  }

  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;

  data.push({id, string, integer, float, date, boolean});
  let added = JSON.stringify(data, null, 3)
  let dataWrite = fs.writeFileSync('c19.json', added, function(err){
    if(err) throw err;
  })
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id;
  data2.push(id);
  getDelete = Array.from(data2);
  let added2 = JSON.stringify(data2, null, 3);
  let datawrite4 = fs.writeFileSync('deleted.json', added2, function(err){
    if(err) throw err;
  })
  data = data.filter(x=>x.id != id);
  let deleted = JSON.stringify(data, null, 3);
  let dataWrite2 = fs.writeFileSync('c19.json', deleted, function(err){
    if(err) throw err;
  })
  res.redirect('/');
});

router.get('/edit/:id', function(req, res){
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync('c19.json', 'utf8'));
  let itemEdit = data.filter(function(x){return x.id == id});
  res.render('edit', {item : itemEdit[0]}); console.log(itemEdit);
});

router.post('/edit/:id', function(req, res){
  let id = req.params.id;
  for(let f=0; f<data.length; f++){
    if(data[f].id==id){
      data[f].string = req.body.string;
      data[f].integer = req.body.integer;
      data[f].float = req.body.float;
      data[f].date = req.body.date;
      data[f].boolean = req.body.boolean;
    }
  }
  let edited = JSON.stringify(data, null, 3);
  let dataWrite3 = fs.writeFileSync('c19.json', edited, function(err){
    if(err) throw err;
  })
  res.redirect('/');
});


module.exports = router;
