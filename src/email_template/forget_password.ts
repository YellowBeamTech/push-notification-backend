import { header } from './header'
import { footer } from './footer'
export default async function forget_password(first_name: string,last_name: string, url: string, company_name: string, company_logo: string): Promise<string> {
  const department = 'From HR Department';
  const header_content =await header(company_name, company_logo)
  const footer_content = await footer(company_name, department)
  return `
  <html>
    <body>
      ${header_content}
        <div class="email-section">
          <div class="content-section">
            <p class="message">
              <h3 class="user-name">Hi ${first_name} ${last_name},</h3>
              We've received a request to change your password!
              If you did not make this request, then please ignore this email.
              Otherwise, please click this link to change your password: 
              <h3><a class="linksAre" href = '${url}'>${url}</a></h3>
            </p>
          </div>
        </div>
      ${footer_content}
    </body>
  </html>
  `
}
