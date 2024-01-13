import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AquaLists from "../../components/reusables/AquaLists";
import AquaPlaceholder from "../../components/reusables/placeHolder";
import { FaDownload, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import DynamicInvoiceCard from "@/components/cards/dynamicInvoiceCard";
import axios from "axios";
import { Button, OverlayTrigger, ButtonGroup, Tooltip } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Image from "next/image";
import InvoiceOperations from "@/services/invoice";
import GstInvoicePlaceHolder from "@/components/reusables/gstInvoicePlaceholder";

const AquaDyanamicInvoicesComponent = () => {
  const Router = useRouter();
  let id = Router.query.id;
  const [invoice, setInvoice] = useState("");
  const [gstvalue, setGstValue] = useState(false);
  const { getIndividualInvoice } = InvoiceOperations();

  useEffect(() => {
    getIndividualInvoice(id).then((res) => {
      setInvoice(res.data);
      if (res) {
        setGst(res.data?.gst);
      }
    });
  }, [getIndividualInvoice, id]);

  const IndianCurrencySumbol = (number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);

  const [Gst, setGst] = useState(false);
  const {
    customerDetails,
    products,
    gstDetails,
    date,
    invoiceNo,
    gst,
  } = invoice;

  const gstValueGenerate = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    let gst = Math.floor(basePrice * 0.18);
    return gst;
  };

  const BasePrice = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    return basePrice;
  };

  const jsPdfButton = () => {
    const doc = new jsPDF();

    // Set the font size for headers
    doc.setFontSize(18);
    doc.text("AQUAKART ENTERPRISES", 105, 30, null, null, "center");

    // Set the font size for body
    doc.setFontSize(10);
    doc.text(`GST- 36AJOPH6387A1Z2`, 20, 50);
    doc.text(
      `Authorized Dealers of: Kent, Grundfos Pressure Pumps, Hitech Solar systems, Solar Power systems`,
      20,
      60
    );
    doc.text(`Gandhamguda ,kokapet`, 20, 70);
    doc.text(`Call us at: 9812118942`, 20, 80);
    doc.text(`Email us at: kundanakent@gmail.com`, 20, 90);

    // Buyer details
    doc.text(`Customer Details`, 20, 110);
    doc.text(`Billing Address:`, 20, 120);
    doc.text(gstDetails.gstAddress, 20, 130);
    doc.text(`Shipping Address:`, 20, 140);
    doc.text(customerDetails.address, 20, 150);
    doc.text(`Phone: ${customerDetails.phone}`, 20, 160);

    // Invoice details on the right
    doc.text(`Invoice number: ${invoiceNo}`, 140, 115);
    doc.text(`Date: ${date}`, 140, 120);

    // Products Table
    let startY = 180;
    doc.autoTable({
      head: [["Item Description", "QTY", "BASE-PRICE", "GST(18%)", "TOTAL"]],
      body: products.map((p) => [
        p.productName,
        p.productQuantity,
        `${BasePrice(p.productPrice)}`,
        `${gstValueGenerate(p.productPrice)}`,
        `${p.productPrice.toFixed(2)}`,
      ]),
      startY: startY,
      theme: "grid",
    });

    // Grand total
    startY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(
      `Grand Total: ${products.reduce((sum, p) => sum + p.productPrice, 0)}`,
      150,
      startY
    );

    // Terms and Conditions
    doc.setFontSize(10);
    let termsStartY = startY + 20;
    doc.text(`Terms & Conditions`, 20, termsStartY);
    doc.text(
      `1. TRANSPORT/LIFTING CHARGES WILL BE BORN BY THE CUSTOMER.`,
      20,
      termsStartY + 10
    );
    // ... Add all terms and conditions

    // Contact details at the bottom
    doc.setFontSize(10);
    let contactStartY = termsStartY + 60; // adjust according to the length of the terms and conditions
    doc.text(`Kent Customer Care`, 20, contactStartY);
    doc.text(`9278912345`, 20, contactStartY + 10);
    doc.text(`Grundfos Customer Care`, 20, contactStartY + 20);
    doc.text(`1800 102 2535`, 20, contactStartY + 30);

    // Save the PDF with a specific name
    doc.save(`${customerDetails.name}_invoice.pdf`);
  };

  let termsAndConditions = [
    {
      title: "Transport",
      description: "TRANSPORT / LIFTING CHARGES WILL BE BORNE BY THE CUSTOMER.",
    },
    {
      title: "Plumber",
      description:
        " PLUMBER SHOULD BE PROVIDED AT THE TIME OF PLUMBING (OR) OUR PLUMBING CONTRACTORS WILL ATTRACT PLUMBING CHARGES.",
    },
    {
      title: "Plumbing Material",
      description:
        "PLUMBING MATERIALS / ELECTRICAL CONNECTION BY CUSTOMER , IF THE PRESSURE BOOSTER PUMP PLUMBING WILL ATTRACT EXTRA CHARGES ",
    },
    {
      title: "SALES RETURN",
      description: "IF THE UNIT IS UNBOXED MACHINE WILL NOT BE TAKEN BACK",
    },
    {
      title: "Delivery and Installation policy",
      description: "DELIVERY / INSTALLATION COMPLETED WITHIN 7 WORKING DAYS. ",
    },
    { title: "Advance policy", description: "100% ADVANCE ALONG WITH PO." },
    {
      title: "Work Monitoring",
      description:
        "PLUMBING WORK VERIFICATION , PROGRAMMING AND TRAINING AND WARRANTY UPLOAD WILL BE DONE BY OUR SERVICE ENGINEERS",
    },
  ];

  return (
    <>
      <div className="mb-5" />
      <div className="container">
        <div className="invoice p-3">
          <DynamicInvoiceCard
            buttons={
              <div className="row">
                <div className="col">
                  <Button onClick={jsPdfButton}>
                    <FaDownload size={25} />
                  </Button>
                </div>
                <div className="col text-end">
                  {" "}
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="primary"
                      href="mailto:customercare@aquakart.co.in"
                    >
                      <FaEnvelope size={25} />
                    </Button>
                    <Button variant="primary" href="phone:9014774667">
                      <FaPhone size={25} />
                    </Button>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>click here to send invoice</Tooltip>}
                    >
                      <Button
                        variant="primary"
                        href={
                          id
                            ? `https://wa.me/91${
                                invoice ? customerDetails.phone : ""
                              }?text=${process.env.url}/admin/crm/invoice/${id}`
                            : ""
                        }
                      >
                        {" "}
                        <FaWhatsapp size={25} />
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </div>
              </div>
            }
          >
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                {Gst ? (
                  <GstInvoicePlaceHolder
                    heading="Kundana Enterprises"
                    gst="36AMUPB4451C1Z7"
                    address="Mehdipatnam"
                  />
                ) : (
                  <GstInvoicePlaceHolder
                    heading="Aquakart"
                    gst="36AJOPH6387A1Z2"
                    address="Gandhamguda , kokapet"
                  />
                )}

                {/* <div className="text-start">
                  <h4>Aquakart</h4>
                  <h5>GST- </h5>
                  <h6>Adddress : Gandhamguda , kokapet</h6>
                </div> */}
              </div>
              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12 text-start">
                <div>Date : {date}</div>
                <AquaPlaceholder
                  type="Invoice-No"
                  size={1.2}
                  name={invoiceNo}
                />
              </div>
            </div>
            <hr />
            <div className="text-center">
              <h3>Customer Details</h3>
            </div>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                  <AquaPlaceholder
                    type="Name"
                    size={1.5}
                    name={invoice ? customerDetails.name : ""}
                  />
                  <AquaPlaceholder
                    type="Email"
                    size={1.1}
                    name={invoice ? customerDetails.email : ""}
                  />
                  <AquaPlaceholder
                    type="Phone"
                    size={1.1}
                    name={invoice ? customerDetails.phone : ""}
                  />
                  <AquaPlaceholder
                    type="Address"
                    size={1.1}
                    name={invoice ? customerDetails.address : ""}
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                  {Gst ? (
                    <div>
                      <AquaPlaceholder
                        type="Gst-Name"
                        size={1.5}
                        name={invoice ? gstDetails.gstName : ""}
                      />
                      <AquaPlaceholder
                        type="Gst-No"
                        size={1.3}
                        name={invoice ? gstDetails.gstNo : ""}
                      />
                      <AquaPlaceholder
                        type="Gst-Phone"
                        size={1.1}
                        name={invoice ? gstDetails.gstPhone : ""}
                      />
                      <AquaPlaceholder
                        type="Gst-Address"
                        size={1.1}
                        name={invoice ? gstDetails.gstAddress : ""}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <h3>Product Details</h3>
            </div>
            <hr />
            <div className="table-responsive">
              <table className="table table-borderless text-center">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Base Price</th>
                    {gstvalue ? (
                      <>
                        <th scope="col">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>click to make it to 18%</Tooltip>}
                          >
                            <Button
                              variant="link"
                              onClick={() => setGstValue(false)}
                            >
                              CGST(9%)
                            </Button>
                          </OverlayTrigger>
                        </th>
                        <th scope="col">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>click to make it to 18%</Tooltip>}
                          >
                            <Button
                              variant="link"
                              onClick={() => setGstValue(false)}
                            >
                              SGST(9%)
                            </Button>
                          </OverlayTrigger>
                        </th>
                      </>
                    ) : (
                      <th scope="col">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              click to clear break up for CGST(9%) and SGST(9%)
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="link"
                            onClick={() => setGstValue(true)}
                          >
                            GST(18%)
                          </Button>
                        </OverlayTrigger>
                      </th>
                    )}
                    <th>Total-Price</th>
                  </tr>
                </thead>

                {invoice
                  ? products.map((r, i) => (
                      <>
                        <tbody>
                          <tr>
                            <td>{r.productQuantity}</td>
                            <td>{r.productName}</td>
                            <td className="text-success">
                              ₹{BasePrice(r.productPrice)}
                            </td>
                            {gstvalue ? (
                              <>
                                <td className="text-gst">
                                  ₹{gstValueGenerate(r.productPrice) / 2}
                                </td>
                                <td className="text-gst">
                                  ₹{gstValueGenerate(r.productPrice) / 2}
                                </td>
                              </>
                            ) : (
                              <td className="text-gst">
                                ₹{gstValueGenerate(r.productPrice)}
                              </td>
                            )}
                            <td className="text-success">₹{r.productPrice}</td>
                          </tr>
                        </tbody>
                      </>
                    ))
                  : ""}
              </table>
            </div>
            <hr />
            <h5 className="mb-3 text-danger">Terms & Conditions</h5>

            {termsAndConditions.map((r, i) => (
              <AquaLists
                key={i}
                title={r.title.toUpperCase()}
                description={r.description}
                number={i + 1}
              />
            ))}
            <hr />
            <div className="row">
              <div className="col"></div>
              <div className="col text-end">
                <h4>Customer Care</h4>
                <ButtonGroup>
                  <Button variant="secondary" href="phone:9278912345">
                    <FaPhone size={20} />
                  </Button>
                  <Button
                    variant="secondary"
                    href={`https://wa.me/91${9278912345}`}
                  >
                    <FaWhatsapp size={20} />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </DynamicInvoiceCard>
        </div>
      </div>
    </>
  );
};

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

export default AquaDyanamicInvoicesComponent;
