const enquiry = ({ name, email, mobile_no }) => {
  return `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Document</title>
              </head>
              <body>
              <h1>${name} has requested an enquiry</h1>
              <p>Email: ${email}</p>
              <p>Phone: ${mobile_no}</p>
              </body>
              </html>`;
};

module.exports = enquiry;
