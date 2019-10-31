const jwt = require('jsonwebtoken');

class AuthMiddleWare {
  /**
   * This method gets JWT token
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  static isAuthenticated(req, res, next) {
    if (typeof req.get('Authorization') !== 'undefined') {
      let token = req.get('Authorization').split(' ')[1];
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, 'somesuperseretsecretkey');
      }
      catch (error) {
        error.statusCode = 500;
        throw error;
      }
      req.customer_id = decodedToken.customer_id;
      next();
    } else {
      res.status(500).json({ error: 'Not Authorized' });
      throw new Error('Not Authorized');
    }

  }
}

export default AuthMiddleWare;