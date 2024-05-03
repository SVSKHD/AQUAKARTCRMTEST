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
import AquaToast from "@/components/reusables/toast";

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
        setPo(res.data?.po);
      }
    });
  }, [getIndividualInvoice, id]);

  const IndianCurrencySumbol = (number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);

  const [Gst, setGst] = useState(false);
  const [PO, setPo] = useState(false);
  const { customerDetails, products, gstDetails, date, invoiceNo, gst } =
    invoice;

  const gstValueGenerate = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    let gst = Math.floor(basePrice * 0.18);
    return gst;
  };

  const BasePrice = (price) => {
    let basePrice = Math.floor(price * 0.8474594);
    return basePrice;
  };

  const jsTestPdfButton = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Set the font size for the title
    doc.setFontSize(18);
    doc.text("Invoice", 105, 30, null, null, "center");

    // Set the font size for the header details
    doc.setFontSize(10);
    doc.text("May Home Cleaning", 20, 50);
    doc.text("282 Robin Lane, Seattle, WA", 20, 55);
    doc.text("555-185-1659", 20, 60);
    doc.text("Info@mayhomecleaning.com", 20, 65);
    doc.text("www.mayhomecleaning.com", 20, 70);

    // Bill to section
    doc.setFontSize(10);
    doc.text("Billed to:", 140, 50);
    doc.text("Rightway Coworking Co.", 140, 55);
    doc.text("192 Merrion St.", 140, 60);
    doc.text("Seattle, WA", 140, 65);

    // Invoice details
    doc.text("Ref. Number 22666AS", 140, 75);
    doc.text("Date: May-11-2024", 140, 80);
    doc.text("Terms: 10 Business Days", 140, 85);
    doc.text("Amount due: $101.60", 140, 90);

    // Set the font size for table headers
    doc.setFontSize(10);

    // Products Table
    doc.autoTable({
      head: [["Description", "Qty/Hrs", "Hr Rate", "Amount"]],
      body: [
        ["Full office clean", "2", "$19.50", "$39"],
        ["Maintenance hallway lights", "1", "$12.50", "$12.50"],
        ["Staff kitchen deep clean", "3", "$18", "$54"],
      ],
      startY: 100,
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
      },
      margin: { left: 20, right: 20 },
      tableWidth: "wrap",
    });

    // Get the final Y position after the table
    let finalY = doc.lastAutoTable.finalY;

    // Subtotal, tax, discount, and total
    doc.setFontSize(10);
    doc.text("Subtotal", 150, finalY + 10);
    doc.text("$105.50", 180, finalY + 10);
    doc.text("Tax Rate (7%)", 150, finalY + 15);
    doc.text("$7.40", 180, finalY + 15);
    doc.text("Discount (10%)", 150, finalY + 20);
    doc.text("-$10.50", 180, finalY + 20);
    doc.text("Total", 150, finalY + 25);
    doc.text("$101.60", 180, finalY + 25);

    // Due date
    doc.setFontSize(10);
    doc.text("Due Date: Please pay invoice by May-25-2024", 20, finalY + 40);

    // Save the PDF with a specific name
    doc.save("invoice.pdf");
  };

  const jsPdfButton = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("AQUAKART ENTERPRISES", 105, 20, null, null, "center");

    // Company Info
    doc.setFontSize(10);
    doc.text(`GST- 36AJOPH6387A1Z2`, 20, 50);
    const authorizedDealersText = `Authorized Dealers of: Kent, Grundfos Pressure Pumps, Hitech Solar systems, Solar Power systems`;
    const splitAuthorizedDealers = doc.splitTextToSize(
      authorizedDealersText,
      180,
    );
    splitAuthorizedDealers.forEach((line, index) => {
      doc.text(line, 20, 55 + 5 * index);
    });
    doc.text(
      `Gandhamguda, kokapet`,
      20,
      60 + 5 * splitAuthorizedDealers.length,
    );
    doc.text(
      `Call us at: 9014774667`,
      20,
      65 + 5 * splitAuthorizedDealers.length,
    );
    doc.text(
      `Email us at: kundanakent@gmail.com`,
      20,
      70 + 5 * splitAuthorizedDealers.length,
    );

    // Customer Details
    doc.setFontSize(12);
    doc.text(`Customer Details`, 20, 90 + 5 * splitAuthorizedDealers.length);
    doc.setFontSize(10);
    doc.text(
      `Name: ${customerDetails.name}`,
      20,
      100 + 5 * splitAuthorizedDealers.length,
    );

    // Split customer address
    const customerAddressLines = doc.splitTextToSize(
      customerDetails.address,
      180,
    );
    let customerAddressY = 105 + 5 * splitAuthorizedDealers.length; // Adjust Y position for the address
    customerAddressLines.forEach((line) => {
      doc.text(line, 20, customerAddressY);
      customerAddressY += 5; // Increment Y position for each new line
    });

    doc.text(`Phone: ${customerDetails.phone}`, 20, customerAddressY + 5);

    // GST Details (if applicable)
    if (gst) {
      doc.setFontSize(12);
      doc.text(`Gst Details`, 120, 90 + 5 * splitAuthorizedDealers.length);
      doc.setFontSize(10);
      doc.text(
        `Gst Name: ${gstDetails.gstName}`,
        120,
        100 + 5 * splitAuthorizedDealers.length,
      );
      doc.text(
        `Gst No: ${gstDetails.gstNo}`,
        120,
        105 + 5 * splitAuthorizedDealers.length,
      );

      // Split GST address
      const gstAddressLines = doc.splitTextToSize(gstDetails.gstAddress, 180);
      let gstAddressY = 110 + 5 * splitAuthorizedDealers.length; // Adjust Y position for the GST address
      gstAddressLines.forEach((line) => {
        doc.text(line, 120, gstAddressY);
        gstAddressY += 5; // Increment Y position for each new line
      });

      doc.text(`Phone: ${gstDetails.gstNo}`, 120, gstAddressY + 5);
    }

    // Invoice Details
    doc.text(`Invoice number: ${invoiceNo}`, 145, 30);
    doc.text(`Date: ${date}`, 145, 35);

    // Products Table
    let startY = customerAddressY + 20; // Adjust startY based on the last text's Y position
    doc.autoTable({
      head: [
        [
          "Item Description",
          "QTY",
          "BASE-PRICE",
          "GST(18%)",
          "CGST (9%)",
          "SGST(9%)",
          "TOTAL",
        ],
      ],
      body: products.map((p) => [
        p.productName,
        p.productQuantity,
        `${BasePrice(p.productPrice)}`,
        `${gstValueGenerate(p.productPrice)}`,
        `${gstValueGenerate(p.productPrice) / 2}`,
        `${gstValueGenerate(p.productPrice) / 2}`,
        `${p.productPrice.toFixed(2)}`,
      ]),
      startY: startY,
      theme: "grid",
    });

    // Grand Total
    startY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(
      `Grand Total: ${products.reduce((sum, p) => sum + p.productPrice, 0).toFixed(2)}`,
      150,
      startY,
    );

    // Terms and Conditions
    doc.setFontSize(10);
    let termsStartY = startY + 20;
    doc.text(`Terms & Conditions`, 20, termsStartY);
    // Add your terms and conditions here...

    // Contact Details
    let contactStartY = termsStartY + 60; // adjust based on the length of terms and conditions
    doc.text(`Kent Customer Care`, 20, contactStartY);
    doc.text(`9278912345`, 20, contactStartY + 10);
    doc.text(`Grundfos Customer Care`, 20, contactStartY + 20);
    doc.text(`1800 102 2535`, 20, contactStartY + 30);

    // Save PDF
    doc.save(`${customerDetails.name}_invoice.pdf`);
  };

  const copyToClipboard = (elementId) => {
    const element = document.getElementById(elementId);
    // Create a new div element to process the innerHTML
    const div = document.createElement("div");
    div.innerHTML = element.innerHTML;
    // Replace <br> tags with newline characters
    let textToCopy = div.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        AquaToast("Successfully Copied", "Success");
      })
      .catch((err) => {
        console.error("Error in copying text: ", err);
      });
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
                {PO ? (
                  <div className="col text-center aqua-border">
                    <h4>ProForma-Invoice</h4>
                  </div>
                ) : (
                  ""
                )}
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
              <hr />
              <div className="text-success text-end m-2 text-bold total-font">
                <h6 className="total-align">
                  GRAND TOTAL : ₹
                  {products?.reduce((a, b) => a + b.productPrice, 0)} /-
                </h6>
              </div>
              <hr />
            </div>

            {PO ? (
              <>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        <h5>Our ICICI Bank</h5>
                        <hr />
                        {/* Clickable div for ICICI details */}
                        <div
                          id="iciciDetails"
                          onClick={() => copyToClipboard("iciciDetails")}
                        >
                          A/c-name: Kundana Enterprises
                          <br />
                          A/c-no: 8813356673
                          <br />
                          IFSC: KKBK0007463
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        <h5>Our KOTAK Bank</h5>
                        <hr />
                        {/* Clickable div for KOTAK details */}
                        <div
                          id="kotakDetails"
                          onClick={() => copyToClipboard("kotakDetails")}
                        >
                          A/c-name: Kundana Enterprises
                          <br />
                          A/c-no: 131605003314
                          <br />
                          IFSC: ICIC0001316
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        <h5>UPI</h5>
                        <hr />
                        {/* Clickable div for UPI details */}
                        <div
                          id="upiDetails"
                          onClick={() => copyToClipboard("upiDetails")}
                        >
                          Gpay: 9182119842
                          <br />
                          PhonePe: 9182119842
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ) : (
              ""
            )}
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
