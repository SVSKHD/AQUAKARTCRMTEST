import { Card } from "react-bootstrap"
const DynamicInvoiceCard = (props) => {
    return (
        <>
            <Card className="container-fluid shadow-lg">
                <Card.Body>{props.buttons}</Card.Body>
                <Card.Body>{props.children}</Card.Body>
            </Card>
        </>
    )
}
export default DynamicInvoiceCard