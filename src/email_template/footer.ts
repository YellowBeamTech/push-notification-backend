export const footer = async (company_name: string, department: string): Promise<string> => {
    return `
    <style>
    .footer-section .reference {
      font-weight: 600;
      color: #146CA4;
    }

    .footer-section p {
      margin: 0;
    }
    </style>
    <footer>
    <div class="email-section">
    <div class="footer-section">
    <p>Thank you,</p>
    <p class="reference">${department}</p>
    <p class="reference">${company_name}</p>
  </div>
</div>
    </footer>`
}