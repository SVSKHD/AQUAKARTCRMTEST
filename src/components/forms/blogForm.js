import React, { useState } from 'react';
import { default as AquaInput } from "../reusables/input";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

const AquaBlogForm = ({ edit, onSubmit, data, handleChange }) => {
    const [formValues, setFormValues] = useState(data);

    const handleDescriptionChange = (content) => {
        setFormValues({ ...formValues, description: content });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    // Adjusted AquaInput components to use passed handleChange
    return (
        <>
            <h1>{edit ? "Edit" : "Create"} Blog</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input label="Title" name="title" value={formValues.title} onChange={handleChange} />
                
                <div className='mb-2'>
                    <label>Description</label>
                    <ReactQuill 
                        theme="snow" 
                        value={formValues.description} 
                        onChange={handleDescriptionChange} 
                    />
                </div>

                <AquaInput label="Keywords" name="keywords" value={formValues.keywords} onChange={handleChange} />
                <AquaInput label="Notes" name="notes" value={formValues.notes} onChange={handleChange} />
                <AquaInput label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleChange} />
                <AquaInput label="Brand" name="brand" value={formValues.brand} onChange={handleChange} />
                <AquaInput label="Ratings" name="ratings" type="number" value={formValues.ratings} onChange={handleChange} />
                <AquaInput label="No of Reviews" name="numberOfReviews" type="number" value={formValues.numberOfReviews} onChange={handleChange} />

                <button type="submit">{edit ? "Update" : "Create"} Blog</button>
            </form>
        </>
    );
};

export default AquaBlogForm;
