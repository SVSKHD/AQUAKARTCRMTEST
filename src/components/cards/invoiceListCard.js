import { Card, ButtonGroup, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaShare, FaWhatsapp } from "react-icons/fa";
import { FaW } from "react-icons/fa6";
const InvoiceListCard = ({ handleEdit, handleDelete, handleShare,handleSend, r }) => {
  const { customerDetails, gstDetails, gst, products, date } = r;
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="row">
          <div className="col">
            <Card.Title>{customerDetails.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {date}-Products Purchased = {products.length}
            </Card.Subtitle>
          </div>
          <div className="col d-flex justify-content-end">
            <ButtonGroup size="sm">
              <Button variant="link" onClick={handleEdit}>
                <FaEdit size={25} />
              </Button>
              <Button variant="link" onClick={handleShare}>
                <FaShare size={25} />
              </Button>
              <Button variant="link" onClick={handleSend}>
                <FaWhatsapp size={25} />
              </Button>
              <Button variant="link" onClick={handleDelete}>
                <FaTrash size={25} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default InvoiceListCard;
