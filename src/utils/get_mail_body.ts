import { forget_password, user_register, contact_us } from '../email_template'
import account_activation from '../email_template/account_activation'
import { EmailOptions } from '../interface/Email'

export const
  getMailOptions = async function (mailOptions: any): Promise<any> {
    const {
      email,
      name,
      subject,
      type,
      domain,
      cc,
      file,
      company_name,
      company_logo,
      first_name,
      last_name,
      phone_number,
      user_email,
      message
    } = mailOptions
    let options: EmailOptions = {
      to: email,
      from: process.env.FROM || 'hr@yellowbeamtech.com',
      name: name,
      subject,
      html: await user_register(first_name, last_name, company_name, company_logo, domain),
      cc: cc ? cc : '',
      attachments: file
        ? [
          {
            filename: 'test.pdf',
            path: file
          }
        ]
        : []
    }
    if (type === 'user_register') {
      options.html = await user_register(first_name, last_name, company_name, company_logo, domain)
    } else if (type === 'forget') {
      options.html = (await forget_password(first_name, last_name, domain, company_name, company_logo))
    } else if (type === 'contact-us') {
      options.html = await contact_us(first_name, last_name, phone_number, message, user_email)
    }else if (type === 'account_activation') {
      options.html = await account_activation(first_name, last_name, company_name, company_logo)
    }
    return options
  }
