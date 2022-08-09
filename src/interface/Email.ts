export interface EmailOptions {
  to: string
  name?: string
  from: string
  data?: string
  subject: string
  text?: string
  html: any
  cc?: string
  attachments?: Object[]
}