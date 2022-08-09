import { header } from './header'
import { footer } from './footer'
export default async function employee_register(first_name: string,last_name: string, company_name: string, company_logo: string, url: string): Promise<string> {
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
                Thanks for your registration as a member of ${ company_name}.<br>
                Please use the link below to set your password with the link below to login into the system.<br>
                <h3><a class="linksAre" href = '${url}'>${url}</a></h3><br>
                Above link will be used only one time.
            </div>
        </div>
      ${footer_content}
    </body>
  </html>
  `
}