import React from 'react';

const AquaInvoiceComponent = ({ json }) => {
  const { invoice_number, date, customer, items } = json;

  return (
    <div>
      <h1>Invoice</h1>
      <p>Invoice Number: {invoice_number}</p>
      <p>Date: {date}</p>
      <p>Customer:</p>
      <ul>
        <li>{customer.name}</li>
        <li>{customer.address}</li>
        <li>{customer.phone}</li>
      </ul>
      <table border="1">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Subtotal</td>
            <td>{json.subtotal}</td>
          </tr>
          <tr>
            <td colspan="3">Tax</td>
            <td>{json.tax}</td>
          </tr>
          <tr>
            <td colspan="3">Total</td>
            <td>{json.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AquaInvoiceComponent;
