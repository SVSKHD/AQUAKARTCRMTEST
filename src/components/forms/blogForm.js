import React from 'react';
import { default as AquaInput } from "../reusables/input";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

const AquaBlogForm = ({ edit, onSubmit, data }) => {
    // State to hold the form values, initializing with data if editing
    const [formValues, setFormValues] = React.useState({
        title: data?.title || '',
        description: data?.description || '',
        keywords: data?.keywords || '',
        notes: data?.notes || '',
        stock: data?.stock || '',
        brand: data?.brand || '',
        ratings: data?.ratings || '',
        numberOfReviews: data?.numberOfReviews || '',
        // Initialize other fields as needed
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDescriptionChange = (content) => {
        setFormValues({ ...formValues, description: content });
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
                <AquaInput label="Title" name="title" value={formValues.title} onChange={handleInputChange} />
                
                <div>
                    <label>Description</label>
                    <ReactQuill 
                        theme="snow" 
                        value={formValues.description} 
                        onChange={handleDescriptionChange} 
                        style={{ height: '200px' }} 
                    />
                </div>

                <AquaInput label="Keywords" name="keywords" value={formValues.keywords} onChange={handleInputChange} />
                <AquaInput label="Notes" name="notes" value={formValues.notes} onChange={handleInputChange} />
                
                {/* Placeholder for category selection - consider implementing a dropdown component */}
                <h4>Category for AquaSelect</h4>
                
                <AquaInput label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleInputChange} />
                <AquaInput label="Brand" name="brand" value={formValues.brand} onChange={handleInputChange} />
                <AquaInput label="Ratings" name="ratings" type="number" value={formValues.ratings} onChange={handleInputChange} />
                <AquaInput label="No of Reviews" name="numberOfReviews" type="number" value={formValues.numberOfReviews} onChange={handleInputChange} />
                
                {/* Placeholder for product selection - consider implementing a dropdown component */}
                <h4>Product Select for AquaSelect</h4>

                <button type="submit">{edit ? "Update" : "Create"} Blog</button>
            </form>
        </>
    );
};

export default AquaBlogForm;
