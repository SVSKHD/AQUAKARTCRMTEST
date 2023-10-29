import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';

const AquaNav = () => {
    return (
        <div className='custom-nav shadow-lg mb-3'>
            <Navbar expand="lg" className='custom-nav bg-body-tertiary' >
                <div className='container-fluid'>
                    <Navbar.Brand href="/">
                        <Image
                            src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/apple-touch-icon_zzuye9.png"
                            height="50"
                            width="50"
                            alt="Aquakart"
                        />
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