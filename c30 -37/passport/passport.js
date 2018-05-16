var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    })
  });

  passport.use('register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'email' : email}, function(err, user){
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('registerMessage', 'email sudah digunakan'));
        }else{
          var newUser = new User();
          newUser.email = email;
          newUser.password = password;

          newUser.save(function(err){
            if (err)
              throw err;            
            return done(null, newUser);
          })
        }
      })
    })
  }
))

passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done){
  User.findOne({'email' : email}, function(err, user){
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'user tidak ditemukan'))
    }
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'password salah'))
    }
    return done(null, user);
  })
}

))

}
