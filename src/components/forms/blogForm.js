import React, { useState } from "react";
import { default as AquaInput } from "../reusables/input";
// Import the styles for ReactQuill

const AquaBlogForm = ({ edit, onSubmit, data }) => {
  const [formValues, setFormValues] = useState(data);

  const handleChange = (fieldName, e) => {
    setFormValues({
      ...formValues,
      [fieldName]: e.target.value,
    });
  };

  const handleDescriptionChange = (content) => {
    handleChange("description", content);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <>
      <h1>{edit ? "Edit" : "Create"} Blog</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <AquaInput
          label="Title"
          name="title"
          value={formValues.title}
          handleChange={(e) => handleChange("title", e)}
        />

        <AquaInput
          label="Keywords"
          name="keywords"
          value={formValues.keywords}
          handleChange={(value) => handleChange("keywords", value)}
        />
        <AquaInput
          label="Notes"
          name="notes"
          value={formValues.notes}
          onChange={(value) => handleChange("notes", value)}
        />
        <AquaInput
          label="Stock"
          name="stock"
          type="number"
          value={formValues.stock}
          onChange={(value) => handleChange("stock", value)}
        />
        <AquaInput
          label="Brand"
          name="brand"
          value={formValues.brand}
          onChange={(value) => handleChange("brand", value)}
        />
        <AquaInput
          label="Ratings"
          name="ratings"
          type="number"
          value={formValues.ratings}
          onChange={(value) => handleChange("ratings", value)}
        />
        <AquaInput
          label="No of Reviews"
          name="numberOfReviews"
          type="number"
          value={formValues.numberOfReviews}
          onChange={(value) => handleChange("numberOfReviews", value)}
        />

        <button type="submit">{edit ? "Update" : "Create"} Blog</button>
      </form>
    </>
  );
};

export default AquaBlogForm;
