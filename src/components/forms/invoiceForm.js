import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import AquaInput from "../reusables/input";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AquaPlaceHolderInput from "../reusables/placeHolderInput";
import moment from "moment";
import AquaSelect from "../reusables/select";
import AquaSwitch from "../reusables/switch";

const AquaInvoiceForm = ({
  initialData,
  mode,
  onSubmit,
  editData,
  clearForm,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
    if (mode === "Edit") {
      setFormData(editData);
    } else {
      setFormData(initialData);
    }
  }, [initialData, editData, mode]);

  const handleInputChange = (e, section, field, index) => {
    const updatedFormData = { ...formData };
    console.log("data", updatedFormData);
    let value = e.target.value;
    // Check if the input is a date and format it

    formData.transport.deliveryDate = moment(
      formData.transport.deliveryDate,
    ).format("DD/MM/YYYY");

    if (section === "products") {
      updatedFormData[section][index][field] = value;
    } else {
      updatedFormData[section][field] = value;
    }

    setFormData(updatedFormData);
  };

  //product array operations
  const handleProductAdd = () => {
    const updatedFormData = { ...formData };
    updatedFormData.products.push({
      productName: "",
      productQuantity: "",
      productPrice: "",
      productSerialNo: "",
    });
    setFormData(updatedFormData);
  };

  const handleRemoveProduct = (index) => {
    setFormData((prevData) => {
      const newProducts = [...prevData.products];
      newProducts.splice(index, 1);
      return {
        ...prevData,
        products: newProducts,
      };
    });
  };

  const handlegstToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      gst: !prevData.gst,
    }));
  };

  const handlepoToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      po: !prevData.po,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const TransferOptions = [
    { label: "none", value: "0" },
    { label: "Gpay", value: "1" },
    { label: "Phone Pe", value: "2" },
    { label: "Neft Kotak", value: "3" },
    { label: "Imps Kotak", value: "4" },
    { label: "Neft Icici", value: "5" },
    { label: "Imps Icici", value: "6" },
    { label: "Phone pe Gateway", value: "7" },
    { label: "Razorpay Gateway", value: "8" },
  ];

  const paymentOptions = [
    { label: "Paid", value: "1" },
    { label: "Not Paid", value: "2" },
  ];

  const deliveryOptions = [
    { label: "delivered", value: "1" },
    { label: "Not delivered", value: "2" },
  ];

  const productOptions = [
    { label: "Select any product", value: "0" },
    { label: "KENT AUTO 8L", value: "1" },
    { label: "KENT AUTO 25L", value: "2" },
    { label: "KENT AUTO 40L", value: "3" },
    { label: "KENT AUTO 100L", value: "4" },
    { label: "KENT BATHROOM SOFTENER", value: "5" },
    { label: "KENT WASHING SOFTENER", value: "6" },
    { label: "KENt SANDFILTER", value: "7" },
    { label: "KENT IRONFILTER", value: "8" },
    { label: "KENT RO (Wall-Mount) GrandStar", value: "8" },
    { label: "KENT RO (under the counter) Sterling", value: "9" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>{mode === "Edit" ? "Edit Invoice" : "Create Invoice"}</h4>
        {mode === "Edit" && (
          <>
            <span>{formData.name}</span>
            <Button onClick={clearForm} className="ml-auto">
              Clear
            </Button>
          </>
        )}
      </div>

      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <h6>Customer Details</h6>
            <AquaInput
              type="text"
              label="Name"
              placeholder="Customer-Name"
              value={formData.customerDetails.name}
              handleChange={(e) =>
                handleInputChange(e, "customerDetails", "name")
              }
            />
            <AquaInput
              type="text"
              label="Phone"
              placeholder="Customer-Phone"
              value={formData.customerDetails.phone}
              handleChange={(e) =>
                handleInputChange(e, "customerDetails", "phone")
              }
            />
            <AquaInput
              type="text"
              label="Email"
              placeholder="Customer-email"
              value={formData.customerDetails.email}
              handleChange={(e) =>
                handleInputChange(e, "customerDetails", "email")
              }
            />
            <AquaInput
              Address={true}
              type="text"
              label="Address"
              placeholder="Customer-Address"
              value={formData.customerDetails.address}
              handleChange={(e) =>
                handleInputChange(e, "customerDetails", "address")
              }
            />
          </div>
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <div className="form-check form-switch">
              <AquaSwitch
                label={"GST"}
                value={formData.gst}
                onChange={handlegstToggleChange}
              />

              <AquaSwitch
                label="Po generation"
                value={formData.po}
                onChange={handlepoToggleChange}
              />
            </div>
            {formData.gst && (
              <>
                <div>
                  <h6>Customer Gst Details</h6>
                  <AquaInput
                    type="text"
                    label="Gst-Name"
                    placeholder="Customer-GST-Name"
                    value={formData.gstDetails.gstName}
                    handleChange={(e) =>
                      handleInputChange(e, "gstDetails", "gstName")
                    }
                  />
                  <AquaInput
                    type="text"
                    label="Gst-No"
                    placeholder="Customer-Gst-No"
                    value={formData.gstDetails.gstNo}
                    handleChange={(e) =>
                      handleInputChange(e, "gstDetails", "gstNo")
                    }
                  />
                  <AquaInput
                    type="text"
                    label="Gst-Phone"
                    placeholder="Customer-Gst-Phone"
                    value={formData.gstDetails.gstPhone}
                    handleChange={(e) =>
                      handleInputChange(e, "gstDetails", "gstPhone")
                    }
                  />
                  <AquaInput
                    type="text"
                    label="Gst-Email"
                    placeholder="Customer-Gst-email"
                    value={formData.gstDetails.gstEmail}
                    handleChange={(e) =>
                      handleInputChange(e, "gstDetails", "gstEmail")
                    }
                  />
                  <AquaInput
                    Address={true}
                    type="text"
                    label="Gst-Address"
                    placeholder="Customer-Gst-Address"
                    value={formData.gstDetails.gstAddress}
                    handleChange={(e) =>
                      handleInputChange(e, "gstDetails", "gstAddress")
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h6>Product Details</h6>
          </div>
        </div>

        <hr />

        {formData.products.map((r, i) => (
          <>
            <div className="row" key={i}>
              <div className="col-lg-2 col-md-2">
                <AquaSelect
                  placeholder="Product Name"
                  type={"text"}
                  options={productOptions}
                  value={r.productName}
                  handleChange={(e) =>
                    handleInputChange(e, "products", "productName", i)
                  }
                />
              </div>
              <div className="col-lg-3 col-md-3">
                <AquaPlaceHolderInput
                  type="text"
                  class="form-control"
                  placeholder="Product Quantity"
                  value={r.productQuantity}
                  handleChange={(e) =>
                    handleInputChange(e, "products", "productQuantity", i)
                  }
                />
              </div>
              <div className="col-lg-2 col-md-2">
                <AquaPlaceHolderInput
                  type="text"
                  class="form-control"
                  placeholder="Product Price"
                  value={r.productPrice}
                  handleChange={(e) =>
                    handleInputChange(e, "products", "productPrice", i)
                  }
                />
              </div>
              <div className="col-lg-3 col-md-3">
                <AquaPlaceHolderInput
                  type="text"
                  class="form-control"
                  placeholder="Product Serials"
                  value={r.productSerialNo}
                  handleChange={(e) =>
                    handleInputChange(e, "products", "productSerialNo", i)
                  }
                />
              </div>
              <div className="col-lg-2 col-md-2">
                <ButtonGroup aria-label="Basic example" size="sm">
                  <Button variant="dark" onClick={handleProductAdd}>
                    <FaPlus size={25} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveProduct(i)}
                  >
                    <FaTrash size={25} />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </>
        ))}

        <hr />
        <div className="row">
          <div className="col">
            <h6>Transport details</h6>
            <AquaSelect
              label={"Delivery Status"}
              placeholder={"Enter Delivery Status"}
              type={"text"}
              options={deliveryOptions}
              value={formData.transport.deliveredBy}
              handleChange={(e) =>
                handleInputChange(e, "transport", "deliveredBy")
              }
            />
            <AquaInput
              label={"Delivery Date and time"}
              placeholder={"Enter Delivery date and time"}
              type={"date"}
              value={formData.transport.deliveryDate}
              handleChange={(e) =>
                handleInputChange(e, "transport", "deliveryDate")
              }
            />
          </div>
          <div className="col">
            <h6>Payment details</h6>
            <AquaSelect
              label={"Transfer Type"}
              placeholder={"Enter Transfer Type"}
              type={"name"}
              value={formData.paidStatus}
              options={TransferOptions}
              handleChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  paidStatus: e.target.value,
                }))
              }
            />
            <AquaSelect
              label={"Paid Status"}
              placeholder={"Enter Paid Status"}
              type={"name"}
              value={formData.paymentType}
              options={paymentOptions}
              handleChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  paymentType: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            {mode === "Edit" ? "Edit Invoice" : "Create Invoice"}
          </Button>
        </div>
      </form>
    </>
  );
};
export default AquaInvoiceForm;
