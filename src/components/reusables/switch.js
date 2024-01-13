import { Form } from "react-bootstrap";
const AquaSwitch = ({ id, label, disabled = false, onChange, ...props }) => {
  return (
    <Form.Check
      type="switch"
      id={id}
      label={label}
      disabled={disabled}
      onChange={onChange}
      {...props} // Spread additional props to the switch
    />
  );
};
export default AquaSwitch;
