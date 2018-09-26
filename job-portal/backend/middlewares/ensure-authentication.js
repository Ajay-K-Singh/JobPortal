const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey;
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtKey.jwt);
    const config = req.app.get('config');
    config.userID = decodedToken.userId;
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Not Authorized'
    })
  }
};