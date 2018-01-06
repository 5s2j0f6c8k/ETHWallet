var express = require('express')
var User = require('../model/user')
var web3 = require('../comm/web3Wrapper')
var router = express.Router()
var jwt = require('jwt-simple')
var url = require('url')
var jwtAuth = require('../comm/jwtAuth')
var jwtAuthEvent = require('../comm/jwtAuthEvent')
var moment = require('moment')
var config = require('config')

/* GET users listing. */
router.post('/register', function (req, res, next) {
  const result = web3.eth.accounts.create()
  var user = new User({
    username: req.body.username,
    userpwd: req.body.userpwd,
    ethAddress: result.address,
    ethParivateKey: result.privateKey,
    accountBlance: 0
  });

  user.save(function (error, result) {
    if (error) {
      console.log(error)
      res.json({ resultCode: "4001", resultMessage: '注册失败' })
    }
    else {
      res.json({ resultCode: "1000", resultMessage: '注册成功' })
    }
  })
});

router.post('/login', function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.json({ resultCode: "4002", resultMessage: "登陆失败" })
    }
    else if (!user) {
      res.json({ resultCode: "4003", resultMessage: "用户名不存在" })
    }
    else {
      user.comparePassword(req.body.userpwd, function (err, isValid) {
        if (isValid) {
          var expires = moment().add(7,'days').valueOf()
          var token = jwt.encode(
            {
              iss: user.id,
              exp: expires
            },
            config.get('appConfig.jwtConfig.jwtTokenSecret')
          );
          res.json({
            token: token,
            expires: expires,
            resultCode: "1000",
            resultMessage: "登陆成功",
            user: user
          })
        }
        else {
          res.json({ resultCode: "4004", resultMessage: "密码错误" })
        }
      })
    }
  })

});

router.get('/userInfo', jwtAuth, jwtAuthEvent, function (req, res, next) {
  res.json(req.user)
});

router.post('/Transfer', jwtAuth, jwtAuthEvent, function (req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
