import axios from "axios";

let baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getInvoices = async () => await axios.get(`${baseUrl}/invoice`);

const createInvoice = async (data) => await axios.post(`${baseUrl}/invoice`, data)

const updateInvoice = async (id, data) =>
  await axios.put(`${baseUrl}/invoice?invoice=${id}`, data);

const getIndividualInvoice = async (id) =>
  await axios.get(`${baseUrl}/invoice?invoice=${id}`);

const removeInvoice = async (id, data) =>
  await axios.put(`${baseUrl}/invoice?invoice=${id}`);

const InvoiceOperations = () => {
  return {
    getInvoices,
    getIndividualInvoice,
    updateInvoice,
    createInvoice,
    removeInvoice
  };
};

export default InvoiceOperations;
