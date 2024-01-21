import { Form } from "react-bootstrap";
const AquaSelect = ({ options, value, handleChange, label }) => {
  return (
    <>
      <div className="mb-3 row">
        {label && <label class="col-sm-3 col-form-label">{label} : </label>}
        <div className={label ? "col-sm-9" : "col-sm-12"}>
          <Form.Control as="select" value={value} onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </div>
      </div>
    </>
  );
};
export default AquaSelect;
