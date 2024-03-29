import axios from "axios";

const getInvoices = async () => await axios.get(`/admin/crm/api/invoice`);

const createInvoice = async (data) =>
  await axios.post(`/admin/crm/api/invoice`, data);

const updateInvoice = async (id, data) =>
  await axios.put(`/admin/crm/api/invoice?invoice=${id}`, data);

const getIndividualInvoice = async (id) =>
  await axios.get(`/admin/crm/api/invoice?invoice=${id}`);

const getGstInvoices = async (gst) =>
  axios.get(`/admin/crm/api/invoice?gst=${gst}`);

const getPoInvoices = async (po) =>
  axios.get(`/admin/crm/api/invoice?po=${po}`);

const getQuotationInvoices = async (quotation) =>
  axios.get(`/admin/crm/api/invoice?quotation=${quotation}`);

const getMonthlyInvoices = async (data) =>
  axios.get(`/admin/crm/api/invoice?monthly=${data}`);

const getYearlyInvoices = async (data) =>
  axios.get(`/admin/crm/api/invoice?year=${data}`);

const removeInvoice = async (id) =>
  await axios.delete(`/admin/crm/api/invoice?invoice=${id}`);

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
