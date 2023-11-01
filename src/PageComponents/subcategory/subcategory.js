import { useState, useEffect, useCallback } from "react";
import AquaLayout from "@/components/Layout/Layout";
import subCategoryOperations from "@/services/subcategory";
import AquaToast from "@/components/reusables/toast";
import AquaCategoryCard from "@/components/cards/categoryCard";
import AquaSpinner from "@/components/reusables/aquaSpinner";

const AquaSubCategoryComponent = () => {
  const [subcategories, setSubCategories] = useState([]);
  const { getSubCategories, getSubCategoryById } = subCategoryOperations();

  const loadSubCategories = useCallback(() => {
    getSubCategories()
      .then((res) => {
        AquaToast("fetched");
        setSubCategories(res.data);
      })
      .catch(() => {
        AquaToast("fetched", true);
      });
  }, [getSubCategories, setSubCategories]);

  useEffect(() => {
    loadSubCategories();
  }, [loadSubCategories]);

  const handleEditSubCategory = () => {};

  const handleShareSubCategory = () => {};

  const handleDeleteSubCategory = () => {};

  return (
    <>
      <AquaLayout>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <h4 className="mb-4">existing Sub-Categories</h4>

            {!subcategories.length ? (
              <AquaSpinner />
            ) : (
              <div>
                {subcategories.map((r, i) => (
                  <AquaCategoryCard
                    r={r}
                    key={i}
                    handleEdit={handleEditSubCategory}
                    handleShare={handleShareSubCategory}
                    handleDelete={handleDeleteSubCategory}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12"></div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaSubCategoryComponent;
