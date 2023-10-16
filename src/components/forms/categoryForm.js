import React, { useState } from 'react';
import AquaInput from '../reusables/input';
import { Button , Form} from "react-bootstrap"
import AquaUpload from '../reusables/AquaUpload';


const AquaCategoryForm = ({ onSave, data }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const { files } = e.target;
        // Assuming you want to store the file objects in the 'images' property
        setFormData((prevData) => ({ ...prevData, images: files }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("keywords", formData.keywords);
  
        // Append image files to FormData
        photos.forEach((file, index) => {
          formDataToSend.append(`images[${index}]`, file);
        });
  
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

            <AquaInput type="text" label="title" name="title" value={formData.title} handleChange={handleChange} />
            <AquaInput Address={true} label="description" name="description" value={formData.description} handleChange={handleChange}/>
            <AquaInput type="text" label="keywords" name="keywords" value={formData.keywords} handleChange={handleChange} />
            <AquaUpload label="images" handleChange={handleImageChange}/>

            <br />
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AquaCategoryForm;
