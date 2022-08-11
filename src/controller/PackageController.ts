import { getRepository, ILike } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Package } from '../entity/Package';
import { Err, NotFoundError } from '../common/errorValidation/errors';
import field_validator from '../utils/field_validator';

export class PackageController {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRepository(Package).find();
      res.status(201).json({ result: result })
    } catch (err) {
      next(err)
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRepository(Package).findOne(req.params.id);

      res.status(201).json({ result: result })

    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {

      const result = await getRepository(Package)
        .createQueryBuilder()
        .update(Package)
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
      const data = await getRepository(Package)
        .createQueryBuilder()
        .softDelete()
        .from(Package)
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


  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const packageRepository = getRepository(Package);
      const { isValid, errors } = field_validator(req)
      if (!isValid) {
        throw new Err('invalid fields sent.', 400, errors);
      }
      const isEmailExist = await packageRepository.count({ name: ILike(req.body.name) })
      if (isEmailExist > 0) {
        throw new Error("This name is already exist");
      }
      const result = await packageRepository.save(req.body);
      res.status(201).json({ message: 'Package created successfully', result: result })
    } catch (err) {
      next(err)
    }
  }

}