/*
 * @Author: qugang 
 * @Date: 2018-01-06 18:08:07 
 * @Last Modified by:   qugang 
 * @Last Modified time: 2018-01-06 18:08:07 
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:"hello world!"})
});

module.exports = router;
