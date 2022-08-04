import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { Err, NotFoundError } from '../common/errorValidation/errors';
import { comparePassword, generateUserJWT, hashPassword } from '../utils/authentication_manager';
import field_validator from '../utils/field_validator';

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
  // using query builder <createQueryBuilder>
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
      // if uploading a file
      // const mediaUpload = await streamUpload(request);

      const { email, password } = req.body;
      const user = await getRepository(User).findOne({ email: email })
      console.log('user', user)
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
      let { email, password } = req.body;
      const isEmailExist = await userRepository.count({ email: email })
      if (isEmailExist > 0) {
        throw new Error("This email is already exist");
      }
      req.body.password = await hashPassword(password)
      const result = await getRepository(User).save(req.body);
      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }
}
