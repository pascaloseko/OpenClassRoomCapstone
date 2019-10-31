// const { pool } = require('../database/config/config');
import Helper from './Helper';
import db from '../database/config/config';
const jwt = require('jsonwebtoken');


/**
 *
 *
 * @class UserController
 */

class UserController {
  /**
   * create a user record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json object with status, customer data and access token
   * @memberof UserController
   */

  static async createUser(req, res) {
    const query = `INSERT INTO users(firstName, lastName, email, password, gender, jobRole, department, address, userType) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const hashPassword = Helper.hashPassword(req.body.password);
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      userType: req.body.userType,
    };
    const values = [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.gender,
      data.jobRole,
      data.department,
      data.address,
      data.userType,
    ];

    try {
      const { rows } = await db.query(query, values);
      const token = jwt.sign(
        {
          email: rows[0].email,
          id: rows[0].id,
        },
        'secretkey',
        { expiresIn: '24h' }
      );
      return res.status(201).json({ user: rows[0], accessToken: 'Bearer ' + token, expires_in: '24h' });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

export default UserController;
