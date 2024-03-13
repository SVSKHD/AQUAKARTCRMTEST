const CustomInvoiceCard = ({ r, handleClick }) => {
  const { customerDetails, gst, gstDetails, products, _id } = r;
  return (
    <>
      <div className="card m-2 shadow-lg">
        <div className="card-body">
          {gst ? (
            <>
              <h3 class="card-title">{gstDetails.gstName}</h3>
              <h4>
                <span class="badge text-bg-success">
                  Gst : {gstDetails.gstNo}
                </span>
              </h4>
            </>
          ) : (
            <>
              <h3 class="card-title">{customerDetails.name}</h3>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                {customerDetails.phone}
              </h6>
            </>
          )}
          <button className="btn btn-base" onClick={(r) => handleClick(r)}>
            Show More
          </button>
        </div>
      </div>
    </>
  );
};
export default CustomInvoiceCard;
