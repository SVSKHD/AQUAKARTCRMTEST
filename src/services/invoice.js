import axios from "axios";

const getInvoices = async () => await axios.get(`/api/invoice`);

const createInvoice = async (data) =>
  await axios.post(`/api/invoice`, data);

const updateInvoice = async (id, data) =>
  await axios.put(`/api/invoice?invoice=${id}`, data);

const getIndividualInvoice = async (id) =>
  await axios.get(`/api/invoice?invoice=${id}`);

const getGstInvoices = async (gst) =>
  axios.get(`/api/invoice?gst=${gst}`);

const getPoInvoices = async (po) =>
  axios.get(`/api/invoice?po=${po}`);

const getQuotationInvoices = async (quotation) =>
  axios.get(`/api/invoice?quotation=${quotation}`);

const getMonthlyInvoices = async (data) =>
  axios.get(`/api/invoice?monthly=${data}`);

const getYearlyInvoices = async (data) =>
  axios.get(`/api/invoice?year=${data}`);

const removeInvoice = async (id) =>
  await axios.delete(`/api/invoice?invoice=${id}`);

const InvoiceOperations = () => {
  return {
    getInvoices,
    getIndividualInvoice,
    getMonthlyInvoices,
    getYearlyInvoices,
    getGstInvoices,
    getPoInvoices,
    getQuotationInvoices,
    updateInvoice,
    createInvoice,
    removeInvoice,
  };
};

export default InvoiceOperations;
