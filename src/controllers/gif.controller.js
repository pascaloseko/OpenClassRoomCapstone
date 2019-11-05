import Helper from './Helper';
import db from '../database/config/config';
import moment from 'moment';
import jwt from 'jsonwebtoken';

const cloud = require('../../cloudinaryConfig');

/**
 *
 *
 * @class GIFController
 */

class GIFController {
  /**
   * create a gif
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json object with status, customer data and access token
   * @memberof GIFController
   */

  static async createGifPost(req, res) {
    const query = `INSERT INTO articles(authorId, createdOn, title, gifUrl, article) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const imageDetails = {
      imageName: req.body.title,
      cloudImage: req.files[0].path,
      imageId: '',
    };

    const imageDetail = await cloud.uploads(imageDetails.cloudImage);

    try {
      if (req.headers && req.headers.authorization) {
        let token = req.get('Authorization').split(' ')[1];
        let decoded;

        try {
          decoded = jwt.verify(token, process.env.SECRET);
        } catch (error) {
          return res.status(401).send('unauthorized');
        }
        const userId = decoded.userId;
        const values = [
          userId,
          moment(new Date()),
          req.body.title,
          imageDetail.url,
          req.body.article,
        ];
        const { rows } = await db.query(query, values);
        return res.status(201).send(rows[0]);
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async listArticles(req, res) {
    const texts = 'SELECT * FROM articles ORDER BY articleId ASC';
    try {
      const { rows } = await db.query(texts);
      if (!rows) {
        return res.status(404).json({ message: 'articles not found' });
      }
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // static async getOne(req, res) {
  //   const text = 'SELECT * FROM articles WHERE articleId=$1';
  //   try {
  //     const { rows } = await db.query(text, [req.params.id]);
  //     if (!rows[0]) {
  //       return res.status(404).send({ message: 'article or gif not found' });
  //     }

  //     return res.status(200).send(rows[0]);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).send(error);
  //   }
  // }

  static async updateGif(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleId=$1 AND authorId = $2';
    const updateQuery = `UPDATE articles
      SET createdOn=$1, title=$2, gifUrl=$3, article=$4
      WHERE articleId=$5 AND authorId=$6 returning *`;
    const imageDetails = {
      imageName: req.body.title,
      cloudImage: req.files[0].path,
      imageId: '',
    };

    const imageDetail = await cloud.uploads(imageDetails.cloudImage);
    try {
      if (req.headers && req.headers.authorization) {
        let token = req.get('Authorization').split(' ')[1];
        let decoded;

        try {
          decoded = jwt.verify(token, process.env.SECRET);
        } catch (error) {
          return res.status(401).send('unauthorized');
        }
        const userId = decoded.userId;
        const { rows } = await db.query(findOneQuery, [req.params.id, userId]);

        if (!rows[0]) {
          return res.status(404).send({ message: 'article or gif not found' });
        }

        const values = [
          moment(new Date()),
          req.body.title,
          imageDetail.url,
          req.body.article,
          req.params.id,
          userId,
        ];

        const response = await db.query(updateQuery, values);
        return res.status(200).send(response.rows[0]);
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async deleteGif(req, res) {
    const deleteQuery = `DELETE FROM articles WHERE articleId=$1 RETURNING *`;
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Article not found' });
      }
      return res.status(204).send({ message: 'Article Deleted' });
    } catch (error) {
      return res.status(404).send(error);
    }
  }

  static async commentArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleId=$1';
    const query = `INSERT INTO comments(articleId, authorId, createdOn, comment) VALUES($1, $2, $3, $4) RETURNING *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'article not found'});
      }
      const values = [
        rows[0].articleid,
        rows[0].authorid,
        moment(new Date()),
        req.body.comment || rows[0].comment
      ];
      const response = await db.query(query, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }
}

export default GIFController;
