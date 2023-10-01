const jwt = require('jsonwebtoken');
const userTable = require('../models/user');

exports.auth = async (req, res, next) => {
    const token = req.header('auth');
    if (!token) {
      return res.status(401).send({ message: 'Access denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const user = await userTable.findByPk(decoded);
      if(user){
        req.user = user;
        next();
      }else{
        res.status(404).json({massage:'User not found!'})
      }
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: 'Invalid token' });
    }
  };
