import { Modal } from "react-bootstrap";
const AquaDialog = (props) => {
  const { show, hide, title, children, size, fullscreen } = props;
  return (
    <>
      <Modal size={size} show={show} onHide={hide} fullscreen={fullscreen}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
export default AquaDialog;
