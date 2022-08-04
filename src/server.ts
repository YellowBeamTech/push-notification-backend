import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { errorHandler } from './common/errorValidation/error';

const fileUpload = multer();

export function initMiddleWare(app): void {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, authorization, x-auth-token, x-admin-token')
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api', require('./routes'))
  app.use(errorHandler);
}

export class Server {
  private readonly _app: express.Application = express();

  public constructor() {
    initMiddleWare(this._app);
  }

  /**
   * Get Express app
   *
   * @returns {express.Application} Returns Express app
   */
  public get app(): express.Application {
    return this._app;
  }
}
