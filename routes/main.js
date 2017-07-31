var express = require('express');
var router = express.Router();
var fs = require('fs')
var dados = fs.readFileSync('./public/metas.json');
var metas = JSON.parse(dados);

var list = [];
console.log(metas);

for (var i = 0 in metas) {
  list[i] ={nome: metas[i].nome,
                      previsto:metas[i].totais.previsto,
                      realizado:metas[i].totais.realizado};
}
console.log(list);
//  for (var i = 0, len =  metas.length; i < len; i++) {
//       list.push(metas.nome[i], metas[i].totais.previsto,metas[i].totais.realizado);
// }
 //console.log(list);

//get Home Page
router.get('/', ensureAuthenticated, function(request, response){
  response.render('dashboard', {layout: 'base', metas:list});
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
