var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    api = require('../workers/api-worker'),
    config = require('../config/config');


/* =============================================
* Displays main search site.
* =========================================== */
router.get('/', function(req, res, next) {
  res.render('index', {
    res: ""
  });
});



/* =============================================
* POST search query for package
* =========================================== */
router.post('/create', function(req, res, next) {

  api.registerPackage(req.body.name, req.body.url, function(err, result){
    if(err){
      console.log(err);
    }
    res.render('index', {
      res: result
    });
  });

});


module.exports = router;