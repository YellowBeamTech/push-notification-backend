import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { status, User } from '../entity/User';
import { Err } from '../common/errorValidation/errors';
import field_validator from '../utils/field_validator';
import { Notification } from '../entity/Notification';

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
  async sendNotification(req: Request, res: Response, next: NextFunction) {
    try {
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
      let tokens:string[]=[];
      activeUsers.map(token => tokens.push(token.device_registration_token))
      console.log('tokens', tokens)
      res.status(201).json({ data: activeUsers })

    } catch (err) {
      next(err)
    }
  }
}
