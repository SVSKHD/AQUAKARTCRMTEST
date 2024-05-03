import { Container, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaArrowRightFromBracket } from "react-icons/fa";

const AquaNav = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="custom-nav shadow-lg mb-3">
      <Navbar className="custom-nav bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/apple-touch-icon_zzuye9.png"
              height="50"
              width="50"
              alt="Aquakart"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <>
                <Navbar.Text>
                  Signed in as: <a href="#login">{user.user.name}</a>
                </Navbar.Text>
                <button className="ms-2" variant="outline-danger">
                  <FaArrowRightFromBracket size={30} />
                </button>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AquaNav;
