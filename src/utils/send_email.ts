import * as nodemailer from 'nodemailer'

export default async (email_data: any): Promise<boolean> => {
  try {
    //for nodemailer
    const transportOptions: any = {
      service: 'gmail',
      host: process.env.TRANSPORT_HOST,
      port: process.env.TRANSPORT_PORT,
      secure: true,
      pool: true, // This is the field you need to add
      auth: {
        user: process.env.TRANSPORT_USER,
        pass: process.env.TRANSPORT_PASS
      }

    }

    const transporter = nodemailer.createTransport(transportOptions)
    const isSent = await transporter.sendMail(email_data)
    console.log('Email send status', isSent)
    transporter.close()
    return true
  } catch (err) {
    console.error('Error in processing job. email', err)
    return false
  }
}

