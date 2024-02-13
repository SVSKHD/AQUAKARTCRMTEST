import { Navbar, Container } from "react-bootstrap";

const customNav = (props) => {
  return (
    <Navbar className="custom-nav-app mb-2">
      <Container fluid>{props.children}</Container>
    </Navbar>
  );
};
export default customNav;
