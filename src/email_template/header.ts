export const header = async (company_name?: string, company_logo?: string): Promise<string> => {
    return `
    <head>
    <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        body {
          font-family: 'Arial', Helvetica, sans-serif;
          margin: 0;
          padding: 0;
          color: #555555;
        }
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        header {
          background-color: #3f93d1;
        }
        .email-section {
          max-width: 95%;
          margin: 10px auto;
          border-radius: 7px;
          padding: 15px;
        }
        .message {
          line-height: 26px;
        }
    
        .user-name {
          font-weight: 600;
          color: #146CA4;
        }
        a {
          color: #00acff;
          word-break: break-all;
      }
      
        .status {
          display: inline-block;
          width: 100px;
          background: #33cc33;
          padding: 5px;
          text-align: center;
          border-radius: 5px 0 5px 0;
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin: 25px;
        }
    
        .status i {
          font-size: 23px;
        }
    
        .status:nth-child(2) {
          background: #e60000;
        }
    
        .linksAre {
          width: 100%;
          text-align: center;
        }
      </style>
    </head>
    <header>
    <div class="email-section">

    <div class="header-section">
      <div class="header-logo">
        <img src=${company_logo} alt="${company_name ? company_name : 'YellowBeamTeck'} Logo">
      </div>
    </div>
</div>
    </header>`
}