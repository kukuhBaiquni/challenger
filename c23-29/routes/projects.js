var express = require('express');
var helpers = require('../helpers');
var moment = require('moment')
var router = express.Router();

module.exports = function(pool){

  router.get('/', helpers, function(req, res, next) {
    let sql = "select count(*) as total from projects";
    let query = [];
    let searching = false;
    let page = req.query.page || 1;
    let url = (req.url == '/') ? '/?page=1' : req.url;
    url = '/projects' + url;
    if(req.query.cid && req.query.id){
      query.push(`member.projectid = ${req.query.id}`);
      searching = true;
    }
    if(req.query.cname && req.query.name){
      query.push(`project.name like '%${req.query.name}%'`);
      searching = true;
    }
    if(req.query.cmember && req.query.member){
      query.push(`users.userid = ${req.query.member}`);
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
      sql = `select * from projects`;
      let admin = req.session.user;
      if(searching){
        sql += ` where ${query.join(' AND ')}`;
      }
      sql += ` limit ${limit} offset ${offset}`
      pool.query(sql, function(err, rows){
        //get mmebers
        let projectids = rows.rows.map(function(e){return e.id});
        pool.query(`SELECT id, m.userid, u.firstname || ' ' || u.lastname as name, m.role, m.projectid FROM member m, users u where m.userid = u.userid and m.projectid IN (${projectids})`, function(err, memberdata){
          let projects = rows.rows.map(function(project){project.members = memberdata.rows.filter(function(member){
            return member.projectid == project.id
          }).map(function(x){return x.name})
          return project
        })
        console.log(admin);

        pool.query('select * from users', function(err, users){
          if(err){
            res.redirect('/login')
          }else{
            res.render('projects/list', {projectcolumns : JSON.parse(req.session.user.projectcolumns), users: users.rows, data : projects, query: req.query, pagination : {page, pages, count, url}, admin : admin})
          }
        })
      })
    })
  })
})

router.post('/projectcolumns', function(req, res){
  let projectcolumns = {
    id : req.body.ocid ? true : false,
    name : req.body.ocname ? true : false,
    members : req.body.ocmembers ? true : false
  }
  req.session.user.projectcolumns = JSON.stringify(projectcolumns);
  pool.query(`update users set projectcolumns = '${JSON.stringify(projectcolumns)}' where userid = ${req.session.user.userid}`, function(){
    res.redirect('/projects')
  })
})

router.get('/add', function(req, res, next) {
  pool.query(`select * from users`, function(err, rows){
    res.render('projects/add', {users : rows.rows});
  })
});

router.post('/add', function(req, res, next){
  let members = req.body.members
  pool.query(`insert into projects (name) values ('${req.body.project}')`, function(err, data){
    if(err){
      res.redirect('/projects')
    }else{
      pool.query('select id from projects order by id desc limit 1', function(err, id){
        let projectid = id.rows[0].id;
        let query = [];
        for(let i = 0; i < members.length; i++){
          query.push(`(${members[i]}, '', ${projectid})`)
        }
        pool.query(`insert into member (userid, role, projectid) values ${query.join(',')}`, function(err, data){
          res.redirect('/projects')
        })
      })
    }
  })
})

router.get('/edit/:id', function(req, res){
  let id = req.params.id;
  pool.query(`select * from projects where id = ${id}`, function(err, item){
    pool.query(`select userid from member where projectid =  ${id}`, function(err, members){
      pool.query(`select * from users`, function(err, users){
        res.render('projects/edit', {item: item.rows[0], members: members.rows, users: users.rows});
      })
    })
  })
});

router.post('/edit/:id', function(req, res){
  let id = req.params.id;
  pool.query(`update projects set name = '${req.body.project}' where id = ${id}`, function(err, data){
    pool.query(`delete from member where projectid = ${req.params.id}`, function(err, deleted){
      let members = req.body.members
      pool.query(`select id from projects where id = ${id}`, function(err, id){
        let projectid = id.rows[0].id;
        let query = [];
        for(let i = 0; i < members.length; i++){
          query.push(`(${members[i]}, '', ${projectid})`)
        }
        pool.query(`insert into member (userid, role, projectid) values ${query.join(',')}`, function(err, data){
          res.redirect('/projects')
        })
      })
    })
  })
})

router.get('/delete/:id', function(req, res, next){
  let id = req.params.id;
  pool.query(`delete from member where projectid = ${id}`, function(err, data){
    if(err){
      res.redirect('/projects')
    }else{
      pool.query(`delete from projects where id = ${id}`, function(){
        pool.query(`delete from activity where projectid = ${req.params.id}`, function(err, goDelete){
          res.redirect('/projects')
        })
      })
    }
  })
})


//=================================ProjectDetails========================================//


router.get('/projectdetails/:id/overview', function(req, res){
  pool.query(`select * from projects where id = ${req.params.id}`, function(err, projectname){
    pool.query(`SELECT m.userid, u.firstname || ' ' || u.lastname as fullname, m.projectid FROM member m, users u where m.userid = u.userid and m.projectid IN (${req.params.id})`, function(err, projectmembers){
      res.render('projectdetails/overview', {projectname : projectname.rows, projectmembers : projectmembers.rows})
    })
  })
})

router.get('/projectdetails/:id/members', helpers, function(req, res, next) {
  let sql = `select count(*) as total from member where projectid = ${req.params.id}`;
  let query = [];
  let searching = false;
  let page = req.query.page || 1;
  let url = (req.url == `/projectdetails/${req.params.id}/members`) ? `/projectdetails/${req.params.id}/members/?page=1` : req.url;
  url = `/projects` + url;

  pool.query(sql, function(err, rows){
    let limit = 3;
    let count = rows.rows[0].total;
    let pages = Math.ceil(count / 3);
    let offset = (page-1) * limit;
    if(req.query.cname && req.query.name){
      query.push(`(firstname like '%${req.query.name}%' or lastname like '%${req.query.name}%')`);
      searching = true;
    }

    if(req.query.cid && req.query.id){
      query.push(`member.userid = ${req.query.id}`);
      searching = true;
    }

    if(req.query.cpos && req.query.position){
      query.push(`users.position = '${req.query.position}'`);
      searching = true;
    }

    if(searching){
      sql += ` and ${query.join(' AND ')}`;
    }

    sql = `select member.userid, firstname, lastname, position, projectid from member inner join users on member.userid = users.userid where projectid = ${req.params.id}`;
    if(searching){
      sql += ` and ${query.join(' AND ')}`;
    }
    sql += ` limit ${limit} offset ${offset}`
    pool.query(sql, function(err, members){
      res.render('projectdetails/listmember', {rows : rows.rows, members : members.rows, projectcolumns : JSON.parse(req.session.user.projectcolumns), query: req.query, pagination : {page, pages, count, url}})
    })
  })
})

router.post('/projectdetails/:id/membercolumns', function(req, res){
  let projectcolumns = {
    id : req.body.ocid ? true : false,
    name : req.body.ocname ? true : false,
    members : req.body.ocpos ? true : false
  }
  req.session.user.projectcolumns = JSON.stringify(projectcolumns);
  pool.query(`update users set projectcolumns = '${JSON.stringify(projectcolumns)}' where userid = ${req.session.user.userid}`, function(){
    res.redirect(`/projects/projectdetails/${req.params.id}/members`)
  })
})

router.get('/projectdetails/:id/members/deletemember/:userid', function(req, res){
  pool.query(`delete from member where userid = ${req.params.userid} and projectid = ${req.params.id}`, function(err, deleted){
    res.redirect(`/projects/projectdetails/${req.params.id}/members`);
  })
})




//==============================================================ISSUE
router.get('/projectdetails/:id/issues', helpers, function(req, res, next) {
  let sql = `select count(*) as total from issues where projectid = ${req.params.id}`;
  let query = [];
  let searching = false;
  let page = req.query.page || 1;
  let url = (req.url == `/projectdetails/${req.params.id}/issues`) ? `/projectdetails/${req.params.id}/issues/?page=1` : req.url;
  url = '/projects' + url;

  pool.query(sql, function(err, rows){
    let limit = 3;
    let count = rows.rows[0].total;
    let pages = Math.ceil(count / 3);
    let offset = (page-1) * limit;

    if(req.query.cid && req.query.id){
      query.push(`issueid = ${req.query.id}`);
      searching = true;
    }
    if(req.query.csub && req.query.sub){
      query.push(`subject like '%${req.query.sub}%'`);
      searching = true;
    }
    if(req.query.ctrack && req.query.tracker){
      query.push(`tracker = '${req.query.tracker}'`);
      searching = true;
    }

    if(searching){
      sql += ` and ${query.join(' AND ')}`;
    }

    sql = `select * from issues where projectid = ${req.params.id}`;
    if(searching){
      sql += ` and ${query.join(' AND ')}`;
    }
    sql += ` limit ${limit} offset ${offset}`
    pool.query(sql, function(err, members){
      res.render('projectdetails/listissue', {rows : rows.rows, members : members.rows, projectcolumns : JSON.parse(req.session.user.projectcolumns), query: req.query, pagination : {page, pages, count, url}})
    })
  })
})

router.get('/projectdetails/:id/issues/add', function(req, res){
  let url = req.url
  pool.query(`select users.userid, firstname, lastname , member.projectid from member inner join users on member.userid = users.userid where projectid = ${req.params.id}`, function(err, getName){
    res.render('projectdetails/addissue', {pagination : {url}, getName : getName.rows})
  })
})

router.post('/projectdetails/:id/issues/add', function(req, res){
  let tracker = req.body.tracker;
  let subject = req.body.subject;
  let description = req.body.description;
  let status = req.body.status;
  let priority = req.body.priority;
  let assignee = req.body.assignee;
  let estimated = req.body.estimated;
  let progress = req.body.progress;
  var d = new Date()

  pool.query(`insert into issues (projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, done, files) values
  (${req.params.id},
    '${tracker}', '${subject}', '${description}', '${status}', '${priority}', ${assignee}, ${req.body.startdate ? '\'' + req.body.startdate + '\'' : null}, ${req.body.startdate2 ? '\'' + req.body.startdate2 + '\'' : null}, ${estimated},
    ${progress}, '${req.body.files}')`, function(err, input){
      pool.query(`select * from issues where projectid = ${req.params.id} order by issueid desc`, function(err, getIssueid){
        pool.query(`insert into activity (time, title, description, author, projectid, date, issueid, status, tracker) values ('${moment(d).format('HH:mm:ss')}', 'A new issue has been added : ${req.body.subject}', '${req.body.description}', '${req.session.user.firstname}', ${req.params.id}, '${moment(d).format()}', ${getIssueid.rows[0].issueid}, '${req.body.status}', '${req.body.tracker}')`, function(err, toAct){
          res.redirect(`/projects/projectdetails/${req.params.id}/issues`)
        })
      })
    })
  })

  router.post('/projectdetails/:id/issuecolumns', function(req, res){
    let projectcolumns = {
      id : req.body.ocid ? true : false,
      name : req.body.ocsub ? true : false,
      members : req.body.octrack ? true : false
    }
    req.session.user.projectcolumns = JSON.stringify(projectcolumns);
    pool.query(`update users set projectcolumns = '${JSON.stringify(projectcolumns)}' where userid = ${req.session.user.userid}`, function(){
      res.redirect(`/projects/projectdetails/${req.params.id}/issues`)
    })
  })

  router.get('/projectdetails/:id/issues/editissue/:issueid', function(req, res){
    let url = req.url;
    pool.query(`select * from issues where issueid = ${req.params.issueid}`, function(err, edited){
      pool.query(`select users.userid, firstname, lastname , member.projectid from member inner join users on member.userid = users.userid where projectid = ${req.params.id}`, function(err, getName){
        pool.query(`select * from users`, function(err, num){
          let getStartDate = moment(edited.rows[0].startdate).format('YYYY-MM-DD')
          let getDueDate = moment(edited.rows[0].duedate).format('YYYY-MM-DD')
          let getCreatedDate = moment(edited.rows[0].createddate).format('YYYY-MM-DD')
          let getUpdatedDate = moment(edited.rows[0].updateddate).format('YYYY-MM-DD')
          let getClosedDate = moment(edited.rows[0].closeddate).format('YYYY-MM-DD')
          let userlog = num.rows.map(x=>x.userid).filter(x=>x == req.session.user.userid);
          res.render('projectdetails/editissue', {issues : edited.rows, pagination : {userlog, url, getStartDate, getDueDate, getCreatedDate, getUpdatedDate, getClosedDate}, getName : getName.rows, num : num.rows})
        })
      })
    })
  })

  router.post('/projectdetails/:id/issues/editissue/:issueid', function(req, res){
    var d = new Date();
    pool.query(`update issues set tracker = '${req.body.tracker}',
    subject = '${req.body.subject}',
    description = '${req.body.description}',
    status = '${req.body.status}',
    priority = '${req.body.priority}',
    assignee = ${req.body.assignee},
    startdate = ${req.body.startdate ? '\'' + req.body.startdate + '\'' : null},
    duedate = ${req.body.startdate2 ? '\'' + req.body.startdate2 + '\'' : null},
    estimatedtime = ${req.body.estimated},
    done = ${req.body.progress},
    files = '${req.body.files}',
    spenttime = '${req.body.spenttime}',
    targetversion = '${req.body.targetversion}',
    author = ${req.body.author},
    createddate = ${req.body.createddate ? '\'' + req.body.createddate + '\'' : null},
    updateddate = ${req.body.updateddate ? '\'' + req.body.updateddate + '\'' : null},
    closeddate = ${req.body.closeddate ? '\'' + req.body.closeddate + '\'' : null},
    parrenttask = ${req.body.parrenttask ? req.body.parrenttask : null} where issueid = ${req.params.issueid}`, function(err, updated){
      pool.query(`insert into activity (time, title, description, author, projectid, date, issueid, status, tracker) values ('${moment(d).format('HH:mm:ss')}', ' an issue has been updated : ${req.body.subject}', '${req.body.description}', '${req.session.user.firstname}', ${req.params.id}, '${moment(d).format()}', ${req.params.issueid}, '${req.body.status}', '${req.body.tracker}')`, function(err, added){
        console.log(err);
        res.redirect(`/projects/projectdetails/${req.params.id}/issues`)
      })
    })
  })

  router.get('/projectdetails/:id/issues/deleteissue/:issueid', function(req, res){
    var d = new Date();
    pool.query(`insert into activity (time, title, description, author, projectid, date, issueid, status) values ('${moment(d).format('HH:mm:ss')}', 'Issue with ID',' ', '${req.session.user.firstname}', ${req.params.id}, '${moment(d).format()}', ${req.params.issueid}, 'Status: Deleted!!')`, function(err, added){
      pool.query(`delete from issues where issueid = ${req.params.issueid}`, function(err, deleted){
        res.redirect(`/projects/projectdetails/${req.params.id}/issues`)
      })
    })
  })

  router.get('/projectdetails/:id/activity', function(req, res, next){
    var url = req.url
    var f = new Date()
    var d = moment(f).format('DD-MM-YYYY')
    var sekarang = moment(f).format('YYYY-MM-DD')
    var g = new Date()
    g.setDate(g.getDate()-7)
    var r = moment(g).format('DD-MM-YYYY')
    var when = '';
    var lalu = moment(f.setDate(f.getDate()-7)).format('YYYY-MM-DD');
    console.log(req.session.user);

    pool.query(`select * from activity a inner join issues i on a.issueid=i.issueid where a.projectid = ${req.params.id}`, function(err, issues){
      pool.query(`select * from activity  where date <= '${sekarang}' AND date >= '${lalu}' and activity.projectid = ${req.params.id} order by time desc`, function(err, act){
        pool.query(`select distinct date from activity where projectid = ${req.params.id}`, function(err, time){
          var times = time.rows;
          let projects = times.map(function(project){
            project.title = act.rows.filter(function(member){
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            }).map(function(x){return x.title})
            project.description = act.rows.filter(function(member){
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            }).map(function(x){return x.description})
            project.author = act.rows.filter(function(member){
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            }).map(function(x){return x.author})
            project.issueid = act.rows.filter(function(member){
              // console.log(member.issueid, project);
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
              // return member.issueid == project.issueid
            /*_issueid_*/ }).map(function(x){return x.issueid})
            project.tracker = act.rows.filter(function(member){
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            /*_tracker_*/  }).map(function(x){return x.tracker})
            project.time = act.rows.filter(function(member){
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            }).map(function(x){return x.time})
            project.status = act.rows.filter(function(member){
              // console.log(member.date, 'memberdate');
              // console.log(moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD'));
              return moment(member.date).format('YYYY-MM-DD') == moment(project.date).format('YYYY-MM-DD')
            }).map(function(x){return x.status})
            return project
          })
          console.log(projects);
          res.render('projectdetails/activity', {now : {when, d, r, url, f}, data : projects, issues : issues.rows, moment : moment, num : act.rows})
        })
      })
    })
  })

  return router;

}
