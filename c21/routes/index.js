var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud21',
  password: 'sariel',
  port: 5432,
})

router.get('/', function(req, res, next) {
  let sql = "select count(*) as total from crud21";
  let query = [];
  let searching = false;
  let page = req.query.page || 1;
  let url = (req.url == '/') ? '/?page=1' : req.url;
  if(req.query.cid && req.query.id){
    query.push(`id = ${req.query.id}`);
    searching = true;
  }
  if(req.query.stringC && req.query.string){
    query.push(`string like '%${req.query.string}%'`);
    searching = true;
  }
  if(req.query.integerC && req.query.integer){
    query.push(`integer = ${req.query.integer}`);
    searching = true;
  }
  if(req.query.floatC && req.query.float){
    query.push(`float = ${req.query.float}`);
    searching = true;
  }
  if(req.query.dateC && req.query.date && req.query.date2){
    query.push(`date between '${req.query.date}' and '${req.query.date2}'`);
    searching = true;
  }
  if(req.query.booleanC && req.query.boolean){
    query.push(`boolean = '${req.query.boolean}'`);
    searching = true;
  }

  if(searching){
    sql += ` where ${query.join(' AND ')}`;
  }
  pool.query(sql, function(err, rows){
    let limit = 3;
    let count = rows.rows[0].total;
    let pages = Math.ceil(count / 3);
    let offset = (page-1) * limit;
    sql = "select * from crud21";
    if(searching){
      sql += ` where ${query.join(' AND ')}`;
    }
    sql += ` limit ${limit} offset ${offset}`
    pool.query(sql, function(err, rows){
      res.render('index', {data : rows.rows, query: req.query, pagination : {page, pages, count, url}})
    })
  })
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res){
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  console.log(date);
  console.log(typeof date);

  pool.query(`insert into crud21(string, integer, float, date, boolean) values ('${string}', ${integer}, '${float}', '${date}', '${boolean}')`)
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id;
  pool.query(`delete from crud21 where id = ${id}`)
  res.redirect('/');
});

router.get('/edit/:id', function(req, res){
  let id = req.params.id;
  pool.query(`select string,integer,float,date,boolean from crud21 where id = ${id}`, function(err, itemEdit){

    res.render('edit', {item : itemEdit.rows[0]});
  })
});

router.post('/edit/:id', function(req, res){
  let id = req.params.id;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  pool.query(`update crud21 set string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' where id = ${id}`)
  res.redirect('/');
});

  module.exports = router;
