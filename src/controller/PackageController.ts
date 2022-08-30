import { getRepository, ILike } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Package } from '../entity/Package';
import { Err, NotFoundError } from '../common/errorValidation/errors';
import field_validator from '../utils/field_validator';
import { User } from '../entity/User';

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
      if (!req.user.is_admin) throw new Error("You are not authorized");

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
      if (!req.user.is_admin) throw new Error("You are not authorized");

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
      if (!req.user.is_admin) throw new Error("You are not authorized");

      const packageRepository = getRepository(Package);
      const { isValid, errors } = field_validator(req)
      if (!isValid) throw new Err('invalid fields sent.', 400, errors);

      const isEmailExist = await packageRepository.count({ name: ILike(req.body.name) })
      if (isEmailExist > 0) throw new Error("This name is already exist");

      const result = await packageRepository.save(req.body);
      res.status(201).json({ message: 'Package created successfully', result: result })
    } catch (err) {
      next(err)
    }
  }


  async subscriptionReport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_admin) throw new Error("You are not authorized");

     console.log('req.params.package_id', req.query.package_id)
      const result = await getRepository(User).createQueryBuilder("user")
          .leftJoinAndSelect("user.userPackage", "pakage")
          .where("user.package_id IS NOT NULL")
      if (req.query.package_id) {
          const packageExist = await getRepository(Package).count({where: {id: req.query.package_id}} );
      if (packageExist <= 0) throw new Error("Package dose not exist");

          result.andWhere("pakage.id = :pakage_id", { pakage_id: req.query.package_id })
      }
      const withPaginationQB =await result.skip(0).getMany();
      res.status(201).json({ result: withPaginationQB })
    } catch (err) {
      next(err)
    }
  }

}