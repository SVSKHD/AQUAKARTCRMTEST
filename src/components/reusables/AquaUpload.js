import { Form } from "react-bootstrap"
const AquaUpload = ({label , handleChange}) => {
  return (
    <>
      <Form.Group controlId="formImages">
        <Form.Label>{label}</Form.Label>
        <Form.Control type="file" name="images" onChange={handleChange} multiple />
      </Form.Group>
    </>
  )
}
export default AquaUpload