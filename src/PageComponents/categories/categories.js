import { useState } from "react"
import AquaLayout from "@/components/Layout/Layout"
import AquaCategoryCard from "@/components/cards/categoryCard";
import AquaCategoryForm from "@/components/forms/categoryForm";



const AquaCategoryPageComponent = () => {

  let initialData = {
    title: "",
    description: "",
    keywords: "",
    images: []
  };

  const handleSave = (formData) => {
    // Implement save logic here
    console.log('Save:', formData);
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log('Cancelled');
  };
  return (
    <>
      <AquaLayout>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <h4 className="mb-4">existing category</h4>
            <AquaCategoryCard />
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <h4>Category form</h4>
            {/* <AquaCategoryForm initialData={initialData} onSubmit={handleSubmit} /> */}
            {/* <YourFormComponent initialData={initialData} onSubmit={handleSubmit} /> */}
            <AquaCategoryForm onSave={handleSave} onCancel={handleCancel} data={initialData} />
          </div>
        </div>
      </AquaLayout>
    </>
  )
}
export default AquaCategoryPageComponent