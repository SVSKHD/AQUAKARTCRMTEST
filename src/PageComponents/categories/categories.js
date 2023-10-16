import { useState, useEffect, useCallback } from "react"
import AquaLayout from "@/components/Layout/Layout"
import AquaCategoryCard from "@/components/cards/categoryCard";
import AquaCategoryForm from "@/components/forms/categoryForm";
import categoryOperations from "@/services/category";
import AquaToast from "@/components/reusables/toast";




const AquaCategoryPageComponent = () => {

  const { getCategories, createCategory, updatedCategory } = categoryOperations()
  const [categories, setCategories] = useState([])

  const loadCategories = useCallback(() => {
    getCategories().then((res) => {
      console.log("cate", res)
      setCategories(res.data)
      AquaToast("fetched");
    })
      .catch(() => {
        AquaToast("not-fetched", true);
      })
  }, [getCategories, setCategories])



  useEffect(() => {
    loadCategories()
  }, [loadCategories])



  let initialData = {
    title: "",
    description: "",
    keywords: "",
    photos: []
  };



  const handleEditCategory = () => {

  }

  const handleShareCategory = () => {

  }

  const handleDeleteCategory = () => {

  }

  const handleSave = (formData) => {
    // Implement save logic here
    console.log('Save:', formData);
    getCategories().then((res) => {
      console.log(res)
    })
      .catch((err) => {
        console.log("err", err)
      })
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
            <h4 className="mb-4">existing categories</h4>

            {!categories.length ? <h3>No Categories yet</h3> : (
              <div>
                {categories.map((r, i) => (
                  <AquaCategoryCard r={r} key={i} handleEdit={handleEditCategory} handleShare={handleShareCategory} handleDelete={handleDeleteCategory} />
                ))}
              </div>
            )}

          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <h4>Category form</h4>
            <AquaCategoryForm onSave={handleSave} onCancel={handleCancel} data={initialData} />
          </div>
        </div>
      </AquaLayout>
    </>
  )
}
export default AquaCategoryPageComponent