import axios from "axios";

const getInvoices = async () => await axios.get(`/admin/crm/api/invoice`);

const createInvoice = async (data) => await axios.post(`/admin/crm/api/invoice`, data);

const updateInvoice = async (id, data) =>
  await axios.put(`/admin/crm/api/invoice?invoice=${id}`, data);

const getIndividualInvoice = async (id) =>
  await axios.get(`/admin/crm/api/invoice?invoice=${id}`);

const getGstInvoices = async(gst)=>(axios.get(`/admin/crm/api/invoice?gst=${gst}`))

const removeInvoice = async (id) =>
  await axios.put(`/admin/crm/api/invoice?invoice=${id}`);



const InvoiceOperations = () => {
  return {
    getInvoices,
    getIndividualInvoice,
    getGstInvoices,
    updateInvoice,
    createInvoice,
    removeInvoice,
  };
};

export default InvoiceOperations;
