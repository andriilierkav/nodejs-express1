const Logger = require('../log');
const logger = new Logger();
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            req.user = jwt.verify(token, secret);
            next();
        }

    }catch (e) {
        logger.log(e)
        res.status(403).send({'status': 'error', 'message': 'Unauthorized'})
    }
}