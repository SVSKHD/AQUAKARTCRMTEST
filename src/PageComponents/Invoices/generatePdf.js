const pdf = require('html-pdf');
import fs from "fs"
const path = require('path');

function generatePdf(data) {
  const pdfOptions = { format: 'Letter' };

  const pdfContent = `
    <html>
      <head>
        <title>Invoice</title>
      </head>
      <body>
        <h1>Invoice</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
  `;

  return new Promise((resolve, reject) => {
    pdf.create(pdfContent, pdfOptions).toFile('public/invoice.pdf', (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export default generatePdf