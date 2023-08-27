import axios from "axios";

let baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;

const getInvoices = () => axios.get(`${baseUrl}/invoice`);

const createInvoice = (data) =>axios.post(`${baseUrl}/invoice`,data)

const updateInvoice = (id, data) =>
  axios.put(`${baseUrl}/invoice?invoice=${id}`, data);

const getIndividualInvoice = (id) =>
  axios.get(`${baseUrl}/invoice?invoice=${id}`);

const InvoiceOperations = () => {
  return {
    getInvoices,
    getIndividualInvoice,
    updateInvoice,
    createInvoice
  };
};

export default InvoiceOperations;
