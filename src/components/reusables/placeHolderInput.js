const AquaPlaceHolderInput = ({ placeholder, handleChange, value }) => {
  return (
    <>
      <div className="mb-1">
        <input
          type="text"
          class="form-control"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
export default AquaPlaceHolderInput;
