var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
const saltRounds = 8;

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField:'email',
      passwordField:'password',
      passReqToCallback:true
    },

    function(req,email,password,done){
      bcrypt.hash(password,saltRounds).then(function(hashPassword) {
        User.create({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          email:email,
          password:hashPassword
        })
        .then(function(newUser) {
          if (!newUser) {
            return done(null,false);
          }
          if (newUser) {
            return done(null,newUser);
          }
        })
        .catch(err => done(err));
      }
      ).catch(err=>console.log('Could not hash password'));
    }
    )
  );

  passport.use('local-signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
 
 
  function(req, email, password, done) {
    var User = user;
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    console.log(User);
    User.findOne({
      where: {
          email: email
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false, {
            message: 'Email does not exist'
        });
      }
      if (!isValidPassword(user.password, password)) {
          return done(null, false, {
              message: 'Incorrect password.'
          });
      }
      var userinfo = user.get();
      return done(null, userinfo);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
          message: 'Something went wrong with your Signin'
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

}