import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { status, User } from '../entity/User';
import { Err, NotFoundError } from '../common/errorValidation/errors';
import field_validator from '../utils/field_validator';
import { Notification } from '../entity/Notification';
import fetch from 'node-fetch';
// import fetch from 'node-fetch';
// const fetch = require('node-fetch');
var admin = require("firebase-admin");
var serviceAccount = require("../../secret-firebase-adminsdk.json");
export class NotificationController {

  async registrationToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepository = getRepository(User);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      const isUserExist = await userRepository.findOne({ id: req.params.id })
      if (!isUserExist) {
        throw new Error("User dose not exist");
      }
      isUserExist.device_registration_token = req.body.deviceToken;
      const result = await userRepository.save(isUserExist);
      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_admin) throw new Error("You are not authorized");

      const result = await getRepository(Notification).find();
      res.status(201).json({ result: result })
    } catch (err) {
      next(err)
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    try {

      if (!req.user.is_admin) throw new Error("You are not authorized");

      const result = await getRepository(Notification).findOne(req.params.id);

      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }


  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_admin) throw new Error("You are not authorized");

      const data = await getRepository(Notification)
        .createQueryBuilder()
        .softDelete()
        .from(Notification)
        .where('id = :id', { id: req.params.id })
        .execute();
      if (data.affected === 1) {
        res.status(201).json({ message: 'record successfully deleted' })
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      next(err)
    }
  }

  async sendNotification(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_admin) throw new Error("You are not authorized");
      const userRepository = getRepository(User);
      const notificationRepository = getRepository(Notification);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      const result = await notificationRepository.save(req.body);
      console.log('result', result)

      const activeUsers = await userRepository.find({
        select: ['device_registration_token'],
        where: {
          status: status.ACTIVE,
          is_admin: false
        }
      })
      let tokens:string[]=['cjpHF3GqTB-MGRFpyBbBhj:APA91bEFFaj_8tZ37btvG5nkc7_JRUlhFYl10vVcUvC8pTOvI6hpuqzmy-FZmH0bHtkOuySxfNm9DeNXmlw5jzsQLuoVqyWkdf6aoDAAyHqSGiYUGufZ53JngbLFHidd61unlY2PQ_e9'];
      // activeUsers.map(token => tokens.push(token.device_registration_token))
      console.log('tokens', tokens)
     
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      var payload = {
        notification: {
          title: "This is a Notification",
          body: req.body
        }
      };
      
       var options = {
        priority: "high",
        timeToLive: 60 * 60 *24
      };
      var notification_body = {
        'notification': payload.notification,
        'registration_ids': tokens
      }
      fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
          // replace authorization key with your key
          'Authorization': 'key=' + 'AIzaSyCI72m7bYTCXXT36rgGEjoAxPGi-vVeja4',
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(notification_body)
      }).then(function (response) {
        console.log(response);
      res.status(201).json({ response: response })

      }).catch(function (error) {
        console.error(error);
        throw new Error(error);
      })

      // admin.messaging().sendToDevice('cjpHF3GqTB-MGRFpyBbBhj:APA91bEFFaj_8tZ37btvG5nkc7_JRUlhFYl10vVcUvC8pTOvI6hpuqzmy-FZmH0bHtkOuySxfNm9DeNXmlw5jzsQLuoVqyWkdf6aoDAAyHqSGiYUGufZ53JngbLFHidd61unlY2PQ_e9', payload, options)
      // .then(function(response) {
      //   console.log("Successfully sent message:", response);
      // })
      // .catch(function(error) {
      //   console.log("Error sending message:", error);
      // });

    } catch (err) {
      next(err)
    }
  }
}
