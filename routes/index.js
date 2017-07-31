var express = require('express');
var router = express.Router();


//get Home Page
//router.get('/', function(request, response){
//  response.render('index');
//});

//get Home Page
router.get('/', function (req, res, next) {
    res.render('home', {layout: false});
});



module.exports = router;
