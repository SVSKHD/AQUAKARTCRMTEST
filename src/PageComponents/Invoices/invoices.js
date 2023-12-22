import AquaLayout from "@/components/Layout/Layout";
import InvoiceListCard from "@/components/cards/invoiceListCard";
import AquaInvoiceForm from "@/components/forms/invoiceForm";
import InvoiceOperations from "@/services/invoice";
import { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import AquaToast from "@/components/reusables/toast";
import { useRouter } from "next/router";
import AquaCrmTabs from "@/components/reusables/tabs";
import CustomNav from "@/components/reusables/customNav";

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
    gst: false, // Set an initial value for gst
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
  const [editInitData, setEditInitData] = useState({});
  const {
    getInvoices,
    createInvoice,
    updateInvoice,
    removeInvoice,
  } = InvoiceOperations();

  const loadInvoices = useCallback(() => {
    getInvoices()
      .then((res) => {
        setInvoices(res.data);
        AquaToast("fetched");
      })
      .catch(() => {
        AquaToast("not-fetched", true);
      });
  }, [getInvoices, setInvoices]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  const handleFormSubmit = (formData) => {
    if (mode) {
      console.log("edit", formData);
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
      console.log(formData);
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
    console.log("edit", mode, i, data, id, editInitData);
  };

  const deleteInvoice = (i) => {
    console.log(i);
  };

  const handleShare = (id) => {
    router.push(`/invoice/${id}`);
  };

  const Tabs = [
    {
      title: "customers",
      component: (
        <>
          {invoices.map((r, i) => (
            <InvoiceListCard
              handleEdit={() => handleEdit(i, r)}
              handleDelete={() => deleteInvoice(i)}
              handleShare={() => handleShare(r._id)}
              r={r}
            />
          ))}
        </>
      ),
      height: "600px",
    },
    {
      title: "GST Customers",
      component: <h1>hello GST</h1>,
    },
  ];

  return (
    <>
      <AquaLayout>
        <CustomNav>
          <h1>date filter</h1>
          </CustomNav>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            {!invoices.length ? (
              <h3>No invoices yet</h3>
            ) : (
              <div>
                <AquaCrmTabs tabs={Tabs} />
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
            />
          </div>
        </div>
      </AquaLayout>
    </>
  );
};

export default AquaInvoiceComponent;
