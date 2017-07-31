var express = require('express');
var router = express.Router();


//get inicio do Router
router.get('/', ensureAuthenticated, function(request, response){
  var centroDeCusto = require('../parametros/centroDeCusto');
  response.render('cadastroProjetos', {layout: 'base', cCusto:centroDeCusto});
});

function ensureAuthenticated(req, res, next)
{
  if (req.isAuthenticated())
      {
                return next();
      }else{
                req.flash('error_msg', 'Faça o Login primeiro!');
                res.redirect('/users/login');
      }
}



module.exports = router;
