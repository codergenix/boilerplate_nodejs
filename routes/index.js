var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome to node api');
});

router.post('/v1/login', users.islogin);
router.get('/v1/user', users.getall);
router.post('/v1/user/create', users.create);
router.put('/v1/user/update', users.update);
router.delete('/v1/user/delete', users.delete);
module.exports = router;
