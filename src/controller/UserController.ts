import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { Err, NotFoundError } from '../common/errorValidation/errors';
import { comparePassword, genCryptoHash, generateUserJWT, hashPassword } from '../utils/authentication_manager';
import field_validator from '../utils/field_validator';
import send_email from '../utils/send_email';
import * as crypto from 'crypto'
import { getMailOptions } from '../utils/get_mail_body';

export class UserController {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRepository(User).find();
      res.status(201).json({ result: result })
    } catch (err) {
      next(err)
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRepository(User).findOne(req.params.id);

      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {

      const result = await getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set(req.body)
        .where("id = :id", { id: req.params.id })
        .execute()
      if (result.affected === 1) {
        res.status(201).json({ message: 'record successfully updated' })
      } else {
        throw new NotFoundError();
      }

    } catch (err) {
      next(err)
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await getRepository(User)
        .createQueryBuilder()
        .softDelete()
        .from(User)
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

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await getRepository(User).findOne({ email: email })
      if (!user) {
        throw new Error("This User dose not exist");
      }
      if (!await comparePassword(user.password, password)) {
        throw new Error("Invalid password");
      }
      const result = {
        token: await generateUserJWT(
          user.id,
          user.email,
          user.is_admin
        ),
        user_details: {
          ...user
        }
      };
      res.status(201).json({ result: result })
    } catch (err) {
      next(err)
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepository = getRepository(User);
      // if uploading a file
      // const mediaUpload = await streamUpload(request);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      let { email } = req.body;
      const isEmailExist = await userRepository.count({ email: email })
      if (isEmailExist > 0) {
        throw new Error("This email is already exist");
      }
      const bytes = crypto.randomBytes(14).toString('hex')
      const hash = await genCryptoHash(bytes)
      req.body.reset_token = hash;
      const result = await userRepository.save(req.body);
      const data = await getMailOptions({
        email: result.email,
        first_name: result.firstName,
        last_name: result.lastName,
        subject: 'Welcome to Push_Notification service!',
        domain: process.env.BASE_URL + `password/set/${bytes}`,
        type: 'user_register',
        user: result,
        company_name: process.env.COMPANY_NAME,
        company_logo: process.env.COMPANY_LOGO
      })
      await send_email(data)
      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }

  async forgot_password(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepository = getRepository(User);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      let { email } = req.body;
      const isUserExist = await userRepository.findOne({ email: email })
      if (!isUserExist) {
        throw new Error("This email dose not exist");
      }

      const bytes = crypto.randomBytes(14).toString('hex')
      const hash = await genCryptoHash(bytes)
      isUserExist.reset_token = hash;
      const result = await userRepository.save(isUserExist);
      const data = await getMailOptions({
        email: result.email,
        first_name: result.firstName,
        last_name: result.lastName,
        subject: 'Reset Password',
        type: 'forget',
        domain: process.env.BASE_URL + `password/reset/${bytes}`,
        company_name: process.env.COMPANY_NAME,
        company_logo: process.env.COMPANY_LOGO
      })
      await send_email(data)
      res.status(201).json({ Message: 'Reset password token sent successfully ' })

    } catch (err) {
      next(err)
    }
  }

  async reset_password(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query
      const { password } = req.body
      if (!token) return next(new Err('Invalid attempt', 400))
      const userRepository = getRepository(User);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      const hash = await genCryptoHash(token)
      const isUserExist = await userRepository.findOne({ reset_token: hash })
      if (!isUserExist) {
        throw new Error("Illegal token attempt.");
      }
      const encrypted_pass = await hashPassword(password)
      isUserExist.password = encrypted_pass;
      isUserExist.reset_token = null;
      await userRepository.save(isUserExist);
      res.status(201).json({ Message: 'Password updated successfully' })
    } catch (err) {
      next(err)
    }
  }
}
