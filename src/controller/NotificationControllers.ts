import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { Err } from '../common/errorValidation/errors';
import field_validator from '../utils/field_validator';

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
      const result = await getRepository(User).save(isUserExist);
      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }
}
