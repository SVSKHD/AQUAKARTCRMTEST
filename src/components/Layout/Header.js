import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const AquaNav = () => {
    return (
        <div className='custom-nav shadow-lg mb-3'>
            <Navbar expand="lg" className='custom-nav bg-body-tertiary' >
                <div className='container-fluid'>
                    <Navbar.Brand href="/">
                        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                      
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default AquaNav;