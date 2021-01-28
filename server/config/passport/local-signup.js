const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false,
    passReqToCallback:true
  },

  function(req, email, password, done) {
    User.create({
      firstName:req.body.firstName.trim(),
      lastName:req.body.lastName.trim(),
      email:email.toLowerCase().trim(),
      password:password.trim(),
      stripeCustomerId:"ASDFGHJKLzxcvbnm12345678"
    })
    .then(function(newUser){
        if(!newUser){
            return done(null,false,{message:'Incorrect Credentials'});
        }
        if (newUser){
            return done(null,newUser);
        }
    })
    .catch(function(err){ return done(err)});
  }
);

