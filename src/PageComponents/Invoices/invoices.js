import AquaLayout from "@/components/Layout/Layout";
import InvoiceListCard from "@/components/cards/invoiceListCard";
import AquaInvoiceForm from "@/components/forms/invoiceForm";
import InvoiceOperations from "@/services/invoice";
import { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import AquaToast from "@/components/reusables/toast";
import { useRouter } from "next/router";
import AquaCrmTabs from "@/components/reusables/tabs";
import AquaDialog from "@/components/reusables/dialog";
import CustomInvoiceCard from "@/components/cards/customInvoiceCard";
import React from "react";

const AquaInvoiceComponent = () => {
  const router = useRouter();
  let initialData = {
    customerDetails: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    gstDetails: {
      gstName: "",
      gstNo: "",
      gstPhone: "",
      gstEmail: "",
      gstAddress: "",
    },
    transport: {
      deliveredBy: "",
      deliveryDate: "",
    },
    gst: false, // Set an initial value for gst,
    po: false,
    aquakartInvoice: false,
    aquakartOnlineInvoice: false,
    quotation: false,
    products: [
      {
        productName: "",
        productQuantity: "",
        productPrice: "",
        productSerialNo: "",
      },
    ],
    paidStatus: "",
    paymentType: "",
  };
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [mode, setMode] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [gstInvoices, setGstInvoices] = useState([]);
  const [poInvoices, setPoInvoices] = useState([]);
  const [quotationInvoices, setQuotationInvoices] = useState([]);
  const [editInitData, setEditInitData] = useState({});
  const [customMonth, setCustomMonth] = useState("");
  const [customYear, setCustomYear] = useState("");
  const [customInvoiceDialog, setCustomInvoicesDialog] = useState(false);
  const [customInvoicesLoading, setCustomInvoicesLoading] = useState(false);
  const [customInvoicesLoad, setCustomInvoicesLoad] = useState([]);
  const {
    getInvoices,
    getGstInvoices,
    getPoInvoices,
    getQuotationInvoices,
    getMonthlyInvoices,
    getYearlyInvoices,
    createInvoice,
    updateInvoice,
    removeInvoice,
  } = InvoiceOperations();

  const loadInvoices = useCallback(() => {
    getInvoices()
      .then((res) => {
        setInvoices(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getInvoices, setInvoices]);

  const loadGstInvoices = useCallback(() => {
    getGstInvoices(true)
      .then((res) => {
        setGstInvoices(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getGstInvoices, setGstInvoices]);

  const loadPoInvoices = useCallback(() => {
    getPoInvoices(true)
      .then((res) => {
        setPoInvoices(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getPoInvoices, setPoInvoices]);

  const loadQuotationInvoices = useCallback(() => {
    getQuotationInvoices(true)
      .then((res) => {
        setQuotationInvoices(res.data);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  }, [getQuotationInvoices, setQuotationInvoices]);

  useEffect(() => {
    loadInvoices();
    loadGstInvoices();
    loadPoInvoices();
    loadQuotationInvoices();
  }, [loadInvoices, loadGstInvoices, loadPoInvoices, loadQuotationInvoices]);

  const handleFormSubmit = (formData) => {
    if (mode) {
      updateInvoice(id, formData)
        .then(() => {
          setInvoices([]);
          loadInvoices();
        })
        .catch(() => {
          setInvoices([]);
          loadInvoices();
        });
    } else {
      createInvoice(formData)
        .then(() => {
          AquaToast("created");
          setInvoices([]);
          loadInvoices();
        })
        .catch(() => {
          AquaToast("please try again", "error");
          setInvoices([]);
          loadInvoices();
        });
    }
  };

  const handleEdit = (i, data) => {
    setMode("Edit");
    setEditInitData(data);
    setId(data._id);
  };

  const deleteInvoice = (i) => {
    removeInvoice(i)
      .then(() => {
        AquaToast("removed invoice successfully", "success");
        setInvoices([]);
        setGstInvoices([]);
        setPoInvoices([]);
        setQuotationInvoices([]);
        loadInvoices();
        loadGstInvoices();
        loadPoInvoices();
        loadQuotationInvoices();
      })
      .catch(() => {
        setInvoices([]);
        setGstInvoices([]);
        setPoInvoices([]);
        setQuotationInvoices([]);
        loadInvoices();
        loadGstInvoices();
        loadPoInvoices();
        loadQuotationInvoices();
        AquaToast("invoices error", "error");
      });
  };

  const handleShare = (id) => {
    router.push(`/invoice/${id}`);
  };

  const [activeTab, setActiveTab] = useState("customers"); // Initial active tab

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const clearForm = () => {
    // Reset form data to initial state
    if (mode === "Edit") {
      setMode("Create"); // Switch to "Create" mode if setMode function is provided
    }
  };

  const Tabs = [
    {
      title: "customers",
      component: (
        <>
          {invoices.map((r, i) => (
            <div key={i}>
              <InvoiceListCard
                handleEdit={() => handleEdit(i, r)}
                handleDelete={() => deleteInvoice(r._id)}
                handleShare={() => handleShare(r._id)}
                r={r}
              />
            </div>
          ))}
        </>
      ),
      height: "600px",
    },
    {
      title: "GST Customers",
      height: "600px",
      component: (
        <>
          {gstInvoices.map((r, i) => (
            <div key={i}>
              <InvoiceListCard
                handleEdit={() => handleEdit(i, r)}
                handleDelete={() => deleteInvoice(i)}
                handleShare={() => handleShare(r._id)}
                r={r}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Quotations",
      height: "600px",
      component: (
        <>
          {quotationInvoices.map((r, i) => (
            <div key={i}>
              <InvoiceListCard
                handleEdit={() => handleEdit(i, r)}
                handleDelete={() => deleteInvoice(r._id)}
                handleShare={() => handleShare(r._id)}
                r={r}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Po-Invoices",
      height: "600px",
      component: (
        <>
          {poInvoices.map((r, i) => (
            <div key={i}>
              <InvoiceListCard
                handleEdit={() => handleEdit(i, r)}
                handleDelete={() => deleteInvoice(r._id)}
                handleShare={() => handleShare(r._id)}
                r={r}
              />
            </div>
          ))}
        </>
      ),
    },
  ];

  const monthOptions = [
    { label: "JANUARY", value: 1 },
    { label: "FEBRUARY", value: 2 },
    { label: "MARCH", value: 3 },
    { label: "APRIL", value: 4 },
    { label: "MAY", value: 5 },
    { label: "JUNE", value: 6 },
    { label: "JULY", value: 7 },
    { label: "AUGUST", value: 8 },
    { label: "SEPTEMBER", value: 9 },
    { label: "OCTOBER", value: 10 },
    { label: "NOVEMBER", value: 11 },
    { label: "DECEMBER", value: 12 },
  ];

  const handleMonthChange = (event) => {
    const year = new Date().getFullYear();
    let selectedMonth = `${year}-${event.target.value}`;
    setCustomMonth(selectedMonth);
  };

  const loadCustomInvoices = () => {
    setCustomInvoicesDialog(true);
    setCustomInvoicesLoading(true);
    getMonthlyInvoices(customMonth)
      .then((res) => {
        setCustomInvoicesLoad([...res.data]);
        setCustomInvoicesLoading(false);
      })
      .catch(() => {
        AquaToast("not-fetched", "error");
      });
  };

  const separateInvoices = (data) => {
    switch (data) {
      case data.gst:
        return (
          <div className="col">
            <CustomInvoiceCard r={data} />
          </div>
        );
      default:
        return (
          <div className="col">
            <CustomInvoiceCard r={data} />
          </div>
        );
    }
  };

  return (
    <>
      <AquaLayout>
        <div className="card-body mb-2">
          <div className="d-flex">
            <select
              class="form-select me-2"
              aria-label="Default select example"
              style={{ width: "300px" }}
              onChange={handleMonthChange}
            >
              <option selected>Open this select menu</option>
              {monthOptions.map((r) => (
                <option key={r} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <button className="btn btn-base" onClick={loadCustomInvoices}>
              Load Invoices
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            {!invoices.length ? (
              <h3>No invoices yet</h3>
            ) : (
              <div>
                <AquaCrmTabs
                  tabs={Tabs}
                  active={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
            )}
          </div>
          {edit === "Edit" ? (
            <>
              <Button onClick={() => setEdit("")}>Create Invoice</Button>
            </>
          ) : (
            <></>
          )}
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <AquaInvoiceForm
              initialData={initialData}
              mode={mode}
              onSubmit={handleFormSubmit}
              editData={editInitData}
              clearForm={clearForm}
            />
          </div>
        </div>
        <AquaDialog
          show={customInvoiceDialog}
          hide={() => setCustomInvoicesDialog(false)}
          title={`Custom date invoices-${customInvoicesLoad.length}`}
          fullscreen={true}
        >
        <h4>Total Invoices - {customInvoicesLoad.length}</h4>
        <h5 className="text-success">
  Total value - ₹{
    new Intl.NumberFormat('en-IN').format(
      customInvoicesLoad.reduce((total, invoice) => {
        // Sum up the productPrice for each product in the invoice
        const invoiceTotal = invoice.products.reduce((invoiceSum, product) => {
          return invoiceSum + product.productPrice;
        }, 0);

        // Add the total for this invoice to the running total for all invoices
        return total + invoiceTotal;
      }, 0) // Start with 0 total
    )
  }
</h5>

          <div className="row">
            {customInvoicesLoad.length > 0 ? (
              <>
                <div className="col">
                  <h4>Gst Invoices</h4>
                  <hr />
                  {customInvoicesLoad.map((r, index) => {
                    return r.gst ? (
                      <CustomInvoiceCard key={index} r={r} />
                    ) : null;
                  })}
                </div>
                <div className="col">
                  <h4>Normal Invoices</h4>
                  <hr />
                  {customInvoicesLoad.map((r, index) => {
                    return !r.gst ? (
                      <CustomInvoiceCard key={index} r={r} />
                    ) : null;
                  })}
                </div>
              </>
            ) : (
              "No Invoices for selected month"
            )}
          </div>
        </AquaDialog>
      </AquaLayout>
    </>
  );
};

export default AquaInvoiceComponent;
