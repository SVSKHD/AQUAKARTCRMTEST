import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const AquaLists = ({ title, description , number}) => {
    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start m-1"
            >
                
                    {number}.
             
                <div className="ms-2 me-auto">
                    <div className="fw-bold text">{title}</div>
                     <div className='text-muted'>{description}</div>
                </div>
               
            </ListGroup.Item>
        </ListGroup>
    );
}

export default AquaLists;