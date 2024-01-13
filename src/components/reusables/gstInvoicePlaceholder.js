const GstInvoicePlaceHolder = ({ heading, gst, address }) => {
  return (
    <div className="text-start">
      <h3>{heading}</h3>
      <h5>GST : {gst}</h5>
      <h6>Address : {address}</h6>
    </div>
  );
};
export default GstInvoicePlaceHolder;
