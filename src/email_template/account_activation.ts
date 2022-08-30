import { header } from './header'
import { footer } from './footer'
export default async function account_activation(first_name: string,last_name: string, company_name: string, company_logo: string): Promise<string> {
  const department = 'From HR Department';
  const header_content =await header(company_name, company_logo)
  const footer_content = await footer(company_name, department)
  return `
  <html>
    <body>
      ${header_content}
        <div class="email-section">
            <div class="content-section">
                <h3>Dear ${first_name} ${last_name},</h3>
                Congratulations you are account is activated  in  ${ company_name}.<br>
          
            </div>
        </div>
      ${footer_content}
    </body>
  </html>
  `
}