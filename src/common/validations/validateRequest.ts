import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { verifyJWT } from '../../utils/authentication_manager';
const openRoutes = ['/signup', '/signin']
export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {

  const userRepository = getRepository(User);
  const token = req.get('authorization')
  if (!openRoutes.includes(req.url)) {
    if (token) {
      const tokenResult = await verifyJWT(token)
      if (tokenResult) {
        const user = await userRepository.findOne({ id: tokenResult.user_id })
        if (!user) throw { message: 'UnAuthorized user attempt' }
        req.user = {
          id: tokenResult.user_id,
          email: tokenResult.email,
          is_admin: tokenResult.is_admin
        }
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

