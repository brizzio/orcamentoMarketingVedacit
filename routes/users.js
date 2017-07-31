var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//login
router.get('/login', function(request, response){
  response.render('login');
});


//register
router.get('/register', function(request, response){
  response.render('register');
});

//register post
router.post('/register', function(req, res){
          var name = req.body.name;
          var email  = req.body.email;
          var username = req.body.username;
          var password = req.body.password;
          var password2 = req.body.password2;


          // Validation
  	req.checkBody('name', 'Name is required').notEmpty();
  	req.checkBody('email', 'Email is required').notEmpty();
  	req.checkBody('email', 'Email is not valid').isEmail();
  	req.checkBody('username', 'Username is required').notEmpty();
  	req.checkBody('password', 'Password is required').notEmpty();
  	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);



          var errors = req.validationErrors();

          if (errors)
          {
            res.render('register', {
                  errors:errors
            });
          }
          else
          {
            var newUser = new User({
                                      name: name,
                                      email:email,
                                      username: username,
                                      password: password
                                                      });
          User.createUser(newUser,function(err,user)
                    {
                        if(err) throw err;
                        console.log(user);
                    });

                      req.flash('success_msg', 'Obrigado por registrar-se. Agora você pode acessar o sistema.');

                      res.redirect('/users/login');

          }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log(username);
            User.getUserByEmail(username,function(err, user){
              if(err) throw err;
              if(!user){
                  return done(null,false,{message: "Usuário não cadastrado..."})
                            }
                User.comparePassword(password, user.password, function(err, isMatch){
                  if(err) throw err;
                  if(isMatch){
                          return done(null, user);
                        }else{
                          return done(null,false,{message: "Senha Inválida"})
                        }
                                                                                                                                                    });
                                                                                                                });

                                                                    }));

                        passport.serializeUser(function(user, done)
                         {
                          done(null, user.id);
                        });

                        passport.deserializeUser(function(id, done)
                        {
                                    User.getUserById(id, function(err, user)
                                    {
                                      done(err, user);
                                    });
                        });

router.post('/login',
  passport.authenticate('local', {successRedirect:'/main/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res) {
      res.redirect('/main/');

  });

router.get('/logout', function(req, res)
{
      req.logout();
      req.flash('success_msg', 'Você está desconectado do sistema.');
      res.redirect('/');
});



module.exports = router;
