var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  login = require('./routes/Login'),
  PJ = require(__dirname + '/routes/pj.route'),
  Panitia = require(__dirname + '/routes/panitia.route'),
  jwt = require('jsonwebtoken'),
  app = express(),
  sequelize = require('./dbsequelize');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// mahasiswa = sequelize.import(__dirname + '/models/mahasiswa.model');
// departement = sequelize.import(__dirname + '/models/departement.model');
// mahasiswa.belongsTo(departement, {foreignKey:'fk_departementId'});
// mahasiswa.findAll().then((user)=> {
//   var hasil = JSON.stringify(user);
//   console.log(user.map((result)=> { return result.toJSON()}));
//   console.log(JSON.stringify(user))
// });

//path for controller
app.use('/login', login);


//middleware untuk API. for check token
app.use(function(req,res,next){
  var token = req.body.token || req.headers['token'];
  if(token){
    jwt.verify(token, 'secret_admire', function(err, decode){
      if(err){
        res.status(500).send("invalidToken");
      }
      else{
        next();
      }

    })
  } else {
    res.send("please send me a token");
  }
});
//*/

//path for role which is use middleware token check
app.use('/pj', PJ);
app.use('/panitia', Panitia);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
};

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
