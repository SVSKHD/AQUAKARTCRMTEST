import { Card, ButtonGroup, Button } from "react-bootstrap"
import { FaTrash, FaEdit, FaShare } from "react-icons/fa"
const InvoiceListCard = ({ handleEdit, handleDelete, handleShare, title, date, product }) => {
    return (
        <Card>
            <Card.Body>

                <div className="row">
                    <div className="col">
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{date}-{product}</Card.Subtitle></div>
                    <div className="col d-flex justify-content-end">
                        <ButtonGroup size="sm">
                            <Button variant="link" onClick={handleEdit}><FaEdit size={25} /></Button>
                            <Button variant="link" onClick={handleShare}><FaShare size={25} /></Button>
                            <Button variant="link" onClick={handleDelete}><FaTrash size={25} /></Button>
                        </ButtonGroup>
                    </div>
                </div>


            </Card.Body>
        </Card>
    )
}
export default InvoiceListCard