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
        setGst(res.data.gst);
      }
    });
  }, []);

  const [gst, setGst] = useState(false);
  const { customerDetails, products, gstDetails, date, invoiceNo } = invoice;

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

    // Logo
    doc.addImage(
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
      "PNG",
      10,
      10,
      30,
      30
    );

    // Title: "Invoice"
    doc.setFontSize(20);
    doc.text(`Invoice - ${invoiceNo}}`, 50, 20);

    // Company (Seller) Details
    doc.setFontSize(10);
    doc.text("Kantech Solutions Private Limited", 10, 40);
    doc.text("Ground Floor, Building 2A, 23 & 24", 10, 45);
    // ... Add more lines as necessary

    // Buyer Details
    doc.setFontSize(10);
    doc.text("Vijaya Traders Private Limited", 110, 40);
    doc.text("5/1, Penthouse 01, 6th Floor, Rich", 110, 45);
    // ... Add more lines as necessary

    // Invoice metadata
    doc.setFontSize(10);
    doc.text("Invoice date: 30/06/2017", 10, 60);
    doc.text("Due date: 14/07/2017", 10, 65);
    doc.text("Invoice number: 1", 10, 70);

    // Products/Services table
    const products = invoice.products;
    const tableData = [
      ["Description", "HSN", "Qty", "Unit price", "Tax", "Amount"],
    ];
    products.forEach((product) => {
      tableData.push([
        product.productName,
        `${gstValueGenerate(product.productPrice)}/-`,
        `${product.productPrice}/-`,
      ]);
    });

    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 80,
    });

    // Total in words
    doc.setFontSize(10);
    doc.text(
      "Total in words: Rupees One Lakh Fifty Seven Thousand Five Hundred",
      10,
      150
    );

    // Save the PDF with a specific name
    doc.save(`${invoice.customerDetails.name}.pdf`);
  };

  let termsAndConditions = [
    {
      title: "Transport",
      description: "TRANSPORT / LIFTING CHARGES WILL BE BORN BY THE CUSTOMER.",
    },
    {
      title: "Plumber",
      description:
        " PLUMBER SHOULD BE PROVIDED AT THE TIME OF INSTALLATION (OR) OUR PLUMBERS MIGHT ATTRACT PLUMBING CHARGES.",
    },
    {
      title: "Plumbing Material",
      description:
        "PLUMBING MATERIALS / ELECTRICAL CONNECTION BY CUSTOMER, Plumbing MATERIAL.",
    },
    {
      title: "Electric Socket If purchased Auto Softener",
      description:
        "ONE ELECTRIC SOCKET HAS TO BE PROVIDED AT THE TIME OF INSTALLATION, IF PRESSURE BOOSTER THEN TWO ELECTRIC SOCKETS.",
    },
    {
      title: "Delivery and Installation policy",
      description: "DELIVERY / INSTALLATION COMPLETED WITHIN 7 WORKING DAYS. ",
    },
    { title: "Advance policy", description: "100% ADVANCE ALONG WITH PO." },
    {
      title: "Work Monitoring",
      description: "PLUMBING WORK MONITORING WILL BE DONE BY OUR ENGINEERS",
    },
  ];

  return (
    <>
      <div className="mb-5" />
      <div className="container">
        <div className="invoice">
          <DynamicInvoiceCard
            buttons={
              <div className="row">
                <div className="col">
                  <Button onClick={jsPdfButton}>
                    <FaDownload size={40} />
                  </Button>
                </div>
                <div className="col text-end">
                  {" "}
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="primary"
                      href="mailto:customercare@aquakart.co.in"
                    >
                      <FaEnvelope size={40} />
                    </Button>
                    <Button variant="primary" href="phone:9014774667">
                      <FaPhone size={40} />
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
                        <FaWhatsapp size={40} />
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </div>
              </div>
            }
          >
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                <div className="text-center">
                  <Image
                    src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"
                    height="100"
                    width="100"
                    alt="Aquakart"
                  />
                  <h4>Kundana Enterprises</h4>
                  <h6>GST- 36AMUPB4451C1Z7</h6>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12 text-center">
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
                  {gst ? (
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
            <table className="table table-borderless text-center">
              <thead>
                <tr>
                  <th scope="col text-start">Quantity</th>
                  <th scope="col">Name</th>
                  <th scope="col">Base-Price</th>
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

                  <th scope="col text-success">Total Price(₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoice
                  ? products.map((r, i) => (
                      <>
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{r.productName}</td>
                          <td className="text-success">
                            ₹{BasePrice(r.productPrice)}
                          </td>
                          {gstvalue ? (
                            <>
                              <td>{gstValueGenerate(r.productPrice) / 2}</td>
                              <td>{gstValueGenerate(r.productPrice) / 2}</td>
                            </>
                          ) : (
                            <td>{gstValueGenerate(r.productPrice)}</td>
                          )}

                          <td className="text-success">₹{r.productPrice}</td>
                        </tr>
                      </>
                    ))
                  : ""}
              </tbody>
            </table>
            <hr />
            <h5 className="mb-3 text-danger">Terms & Conditions</h5>

            {termsAndConditions.map((r, i) => (
              <AquaLists
                key={i}
                title={r.title}
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
                    <FaPhone size={30} />
                  </Button>
                  <Button
                    variant="secondary"
                    href={`https://wa.me/91${9278912345}`}
                  >
                    <FaWhatsapp size={30} />
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
