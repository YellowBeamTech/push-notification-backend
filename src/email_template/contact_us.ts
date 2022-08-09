
import { header } from './header'
import { footer } from './footer'
export default async function contact_us(
  first_name: string,
  last_name: string,
  phone_number: string,
  message: string,
  user_email:string): Promise<string> {
  const department = `From YellowBeamTech`;
  let company_name = '';
  const header_content = await header(company_name)
  const footer_content = await footer(company_name, department)
  return `
  <html>
    <body>
      ${header_content}
        <div class="email-section">
          <div class="content-section">
            <h3>customer name : ${first_name} ${last_name}</h3>
            <h3>customer email :${user_email}</h3>
            <h3>customer phone :${phone_number} </h3>
            <h3>customer message:${message} </h3>
          </div>
        </div>
        </div>
      ${footer_content}
    </body>
  </html>
  `
}