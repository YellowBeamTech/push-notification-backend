import { Request, Response, NextFunction } from 'express';
import { body, Result, ValidationError, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { verifyJWT } from '../../utils/authentication_manager';
import { RequestValidationError } from '../errorValidation/errors/request-validation-error';
const openRoutes = ['/signup', '/signin']
export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {

  const userRepository = getRepository(User);
  const token = req.get('authorization')
  console.log('token', token)
  if (!openRoutes.includes(req.url)) {
    if (token) {
      const tokenResult = await verifyJWT(token)
      console.log('tokenResult', typeof tokenResult)

      if (tokenResult) {
        const user = await userRepository.findOne({ id: tokenResult.user_id })
        console.log('user', user)
        if (!user) throw { message: 'UnAuthorized user attempt' }
        req.user = {
          id: tokenResult.user_id,
          email: tokenResult.email,
          is_admin: tokenResult.is_admin
        }
        console.log('req.useruser', req.user)
      } else {
        next(new Error('Invalid authorization token'));
      }
    } else {
      next(new Error('Please provide authorization token'));
    }
  }
  //let errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   throw new RequestValidationError(errors.array());
  // }
  next();

};

