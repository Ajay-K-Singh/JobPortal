const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'keep_it_secret');
    const config = req.app.get('config');
    config.userID = decodedToken.userId;
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Not Authorized'
    })
  }
};