var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./config/database');


//conecta com o sandbox do mlab
//mongoose.connect(config.database);

mongoose.connect('mongodb://localhost/mktvedacit');
//mongoose.connect('mongodb://localhost/maindb');

var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var projetos = require('./routes/projetos');

//Inicia a aplicação
var app = express();

//View Engine
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/main', main);
app.use('/users', users);
app.use('/projetos', projetos);

// Set Port
app.set('port', (process.env.PORT || 3009));

app.listen(app.get('port'), function(){
	console.log('Aplicativo iniciado na porta  '+app.get('port'));
});

/*
var localtunnel = require('localtunnel');
var tunnel = localtunnel(app.get('port'), {subdomain:"vedacit"},function (err, tunnel) {
if (err) throw err;
 console.log(tunnel.url);
 });

 // When the tunnel is closed
tunnel.on('close', function() {
  console.log('local tunnel foi fechado');
  process.exit(1);
});

//Read more at https://www.pluralsight.com/guides/node-js/exposing-your-local-node-js-app-to-the-world#DU1vxgAmGzbSQpyk.99
*/
