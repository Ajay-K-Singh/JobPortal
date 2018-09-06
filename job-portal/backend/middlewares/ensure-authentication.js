const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'keep_it_secret');
    console.log(token);
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Not Authorized'
    })
  }
};