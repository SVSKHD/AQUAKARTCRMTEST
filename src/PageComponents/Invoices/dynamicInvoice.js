import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AquaLists from "../../components/reusables/AquaLists";
import AquaPlaceholder from "../../components/reusables/placeHolder";
import { FaDownload, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import DynamicInvoiceCard from "@/components/cards/dynamicInvoiceCard";
import axios from "axios";
import { Button, OverlayTrigger, ButtonGroup } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Image from "next/image";

const AquaDyanamicInvoicesComponent = () => {
  const Router = useRouter();
  let id = Router.query.id;
  const [invoice, setInvoice] = useState("");
  const [gstvalue, setGstValue] = useState(false);

  let baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let URL = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/invoice?invoice=${id}`).then((res) => {
      setInvoice(res.data);
      if (res) {
        setGst(res.data.gst);
      }
    });
  }, [baseUrl, id]);

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

    doc.setFontSize(16);
    doc.text("AquaKart", 25, 20);
    doc.addImage(
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
      "PNG",
      5,
      10,
      20,
      20
    );
    // Customer Details
    doc.setFontSize(12);
    doc.text("Customer Details:", 10, 50);
    doc.setFontSize(10);
    doc.text(`Name: ${invoice.customerDetails.name}`, 20, 60);
    doc.text(`Email: ${invoice.customerDetails.email}`, 20, 70);
    doc.text(`Phone: ${invoice.customerDetails.phone}`, 20, 80);
    doc.text(`Address: ${invoice.customerDetails.address}`, 20, 90);

    // Invoice Details
    doc.setFontSize(12);
    doc.text("Invoice Details:", 10, 100);
    doc.setFontSize(10);
    doc.text(`Invoice No: ${invoice.invoiceNo}`, 20, 110);
    doc.text(`Date: ${invoice.date}`, 20, 120);

    // Product Details Table
    doc.setFontSize(12);
    doc.text("Product Details:", 10, 130);
    const products = invoice.products;
    const tableData = [["Product Name", "Quantity", "GST(18%)", "Total-Price"]];
    products.forEach((product) => {
      tableData.push([
        product.productName,
        product.productQuantity.toString(),
        `${gstValueGenerate(product.productPrice)}/-`, // Assuming GST is always 18%
        ` ${product.productPrice}/-`,
      ]);
    });

    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 135, // Position the table below the previous content
    });

    doc.setFontSize(12);
    doc.text("Terms & Conditions:", 10, 155);

    const termData = [["terms", "description"]];
    termsAndConditions.forEach((t) => {
      termData.push([t.title, t.description]);
    });
    doc.autoTable({
      head: [termData[0]],
      body: termData.slice(1),
      startY: 160,
    });

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
                    <Button
                      variant="primary"
                      href={
                        id
                          ? `https://wa.me/91${
                              invoice ? customerDetails.phone : ""
                            }?text=${URL}/invoice/${id}`
                          : ""
                      }
                    >
                      {" "}
                      <FaWhatsapp size={40} />
                    </Button>
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
                  <th scope="col">Quantity</th>
                  <th scope="col">Name</th>
                  <th scope="col">Base-Price</th>
                  {gstvalue ? (
                    <>
                      <th scope="col">
                        <Button
                          variant="link"
                          onClick={() => setGstValue(false)}
                        >
                          CGST(9%)
                        </Button>
                      </th>
                      <th scope="col">
                        <Button
                          variant="link"
                          onClick={() => setGstValue(false)}
                        >
                          SGST(9%)
                        </Button>
                      </th>
                    </>
                  ) : (
                    <th scope="col">
                      <Button variant="link" onClick={() => setGstValue(true)}>
                        GST(18%)
                      </Button>
                    </th>
                  )}

                  <th scope="col text-success">Total Price(₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoice
                  ? products.map((r, i) => (
                      <>
                        <tr>
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
