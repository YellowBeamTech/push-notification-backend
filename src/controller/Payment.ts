import { Request, Response, NextFunction } from 'express';
const secret = process.env.STRIPE_SECRET_KEY!;
import { getConnection, getRepository, Not } from 'typeorm';
import { Err } from '../common/errorValidation/errors';
import { Package } from '../entity/Package';
import { Payment } from '../entity/Payment';
import { status, User } from '../entity/User';
import field_validator from '../utils/field_validator';
import { getMailOptions } from '../utils/get_mail_body';
import send_email from '../utils/send_email';

const stripe = require('stripe')(secret);

export class PaymentController {
  async payment(req: Request, res: Response, next: NextFunction) {
    const connection = await getConnection();
    const queryRunner = await connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const userRepository = getRepository(User);

      const { isValid, errors } = field_validator(req)
      if (!isValid) throw new Err('invalid fields sent.', 400, errors);
      const user = await userRepository.findOne({ id: req.user.id })
      const subscription = await getRepository(Package).findOne({ id: req.body.package_id })
      const customer = await createCustomer(req.body.token, user.email);
      const charge = await createCharge(customer.id, subscription.price);
      if (charge && charge.status == 'succeeded') {
        // const createInvoiceData = await createInvoice(customer.id);
        // console.log('createInvoiceData', createInvoiceData)
        // const sendInvoiceMail = await sendInvoice(createInvoiceData.id);
        console.log('charge', charge)
        const transactionData = {
          user_id: user.id,
          charge_id: charge.id,
          card_id: customer.default_source,
          fingerprint: charge.payment_method_details.card.fingerprint,
          customer_id: customer.id,
          stripe_token: req.body.token
        }
        const transaction = await queryRunner.manager.getRepository(Payment).save(transactionData);
        console.log('transaction', transaction)
        user.status = status.ACTIVE;
        user.transaction_id = transaction.id;
        user.package_id = subscription.id;
        user.notification_limit = subscription.no_of_notifications;
        const updateUser = await queryRunner.manager.getRepository(User).save(user);
        console.log('updateUser', updateUser)
        queryRunner.commitTransaction();
        queryRunner.release();
      } else {
        throw new Error("payment failed")
      }
      const data = await getMailOptions({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        subject: 'Account Activation',
        domain: process.env.BASE_URL,
        type: 'account_activation',
        user: user,
        company_name: process.env.COMPANY_NAME,
        company_logo: process.env.COMPANY_LOGO
      })
      await send_email(data)
      res.status(201).json({ message: 'payment successfull' })
    } catch (error) {
      console.log('error', error.message)
      queryRunner.rollbackTransaction()
      next(error)
    }
  }

  async createStripeToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('req.body', req.body)
      const token = await createToken(req.body);
      if (token.error) {
        throw new Error("token not created")
      }
      if (!token.id) {
        throw new Error("token creation failed")
      }
      console.log('token', token)

      res.status(201).json({ token: token })
    } catch (error) {
      console.log('error', error.message)
      next(error)
    }
  }
}

const createToken = async (cardData) => {
  let token: any = {};
  try {
    token = await stripe.tokens.create({
      card: {
        number: cardData.cardNumber,
        exp_month: cardData.month,
        exp_year: cardData.year,
        cvc: cardData.cvv
      }
    });
  } catch (error) {
    switch (error.type) {
      case 'StripeCardError':
        token['error'] = error.message;
        break;
      default:
        token['error'] = error.message;
        break;
    }
  }
  return token;
}

const createCharge = async (tokenId, amount) => {
  let charge: any = {};
  try {
    charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      customer: tokenId,
      description: 'Done'
    });
  } catch (error) {
    charge['error'] = error.message;
  }
  return charge;
}


const createCustomer = async (tokenId, email) => {
  return await stripe.customers.create({
    email: email,
    source: tokenId
  })
}


const createInvoice = async (customerId) => {

  try {
    return await stripe.invoices.create({
      customer: customerId,
    });
  } catch (error) {
    return error.message
  }
}


const sendInvoice = async (invoiceId) => {

  try {
    return await stripe.invoices.sendInvoice(
      invoiceId
    );
  } catch (error) {
    return error.message;
  }

}