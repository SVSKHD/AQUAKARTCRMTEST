const CustomInvoiceCard = ({ r }) => {
  const { customerDetails, gst, gstDetails, products, _id } = r;
  return (
    <>
      <div className="card m-2 shadow-lg">
        <div className="card-body">
          {gst ? (
            <>
              <h5 class="card-title">{gstDetails.gstName}</h5>
              <span class="badge text-bg-success">
                gst : {gstDetails.gstNo}
              </span>
            </>
          ) : (
            <>
              <h5 class="card-title">{customerDetails.name}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                {customerDetails.phone}
              </h6>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CustomInvoiceCard;
