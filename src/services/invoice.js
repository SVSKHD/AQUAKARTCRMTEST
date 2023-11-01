import axios from "axios";

const getInvoices = async () =>
  await axios.get(`${process.env.apiKey}/invoice`);

const createInvoice = async (data) =>
  await axios.post(`${process.env.apiKey}/invoice`, data);

const updateInvoice = async (id, data) =>
  await axios.put(`${process.env.apiKey}/invoice?invoice=${id}`, data);

const getIndividualInvoice = async (id) =>
  await axios.get(`${process.env.apiKey}/invoice?invoice=${id}`);

const removeInvoice = async (id) =>
  await axios.put(`${process.env.apiKey}/invoice?invoice=${id}`);

const InvoiceOperations = () => {
  return {
    getInvoices,
    getIndividualInvoice,
    updateInvoice,
    createInvoice,
    removeInvoice,
  };
};

export default InvoiceOperations;
