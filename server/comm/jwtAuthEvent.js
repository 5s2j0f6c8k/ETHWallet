/*
 * @Author: qugang 
 * @Date: 2018-01-06 18:07:44 
 * @Last Modified by:   qugang 
 * @Last Modified time: 2018-01-06 18:07:44 
 */

module.exports = function(req, res, next) {
	if (!req.user) {
		res.sendStatus(401)
	}	else {
		next()
	}
}