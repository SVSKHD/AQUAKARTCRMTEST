// components/ExportToExcel.js

import React from 'react';
import * as XLSX from 'xlsx';

// Assuming 'invoices' is your array of invoice objects

const AquaExportToExcel = ({ invoices }) => {
  const gstValueGenerate = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    let gst = Math.floor(basePrice * 0.18);
    return gst;
  };

  const BasePrice = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    return basePrice;
  };

  const exportToExcel = () => {
    const enhancedInvoices = invoices.map((invoice) => {
      const enhancedProducts = invoice.products.map((product) => ({
        ...product,
        basePrice: BasePrice(product.productPrice),
        gst: gstValueGenerate(product.productPrice)
      }));

      return {
        ...invoice,
        products: enhancedProducts
      };
    });

    const exportData = enhancedInvoices.flatMap(invoice =>
      invoice.products.map(product => ({
        InvoiceNo: invoice.invoiceNo,
        CustomerName: invoice.customerDetails.name,
        ProductName: product.productName,
        ProductQuantity: product.productQuantity,
        ProductPrice: product.productPrice,
        BasePrice: product.basePrice,
        GST: product.gst
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
    XLSX.writeFile(workbook, 'EnhancedInvoices.xlsx');
  };

  return <button className='btn btn-primary' onClick={exportToExcel}>Export to Excel</button>;
};

export default AquaExportToExcel;
