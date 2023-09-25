import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import pdf from 'html-pdf';

const InvoicePDF = ({ json }) => {
  const html = renderToStaticMarkup(<MyInvoiceComponent json={json} />);

  pdf.create(html, {
    header: {
      height: '10mm',
      contents: '<h1>Invoice</h1>',
    },
  }).toBuffer((err, buffer) => {
    // Use the PDF buffer to download the file.
  });

  return null;
};

export default InvoicePDF;