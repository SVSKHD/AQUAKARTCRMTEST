import { useState, useEffect, useCallback } from "react"
import AquaLayout from "@/components/Layout/Layout"
import productOperations from "@/services/product"
import AquaCategoryCard from "@/components/cards/categoryCard"
import AquaToast from "@/components/reusables/toast"

const AquaProductPageComponent = () => {
    const { getProductById, getProducts, updatedProduct } = productOperations()
    const [products, setProducts] = useState([])

    const loadProducts = useCallback(() => {
        getProducts().then((res) => {
            setProducts(res.data)
            AquaToast("fetched");
        })
            .catch(() => {
                AquaToast("not-fetched", true);
            })
    }, [getProducts, setProducts])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    return (
        <>
            <AquaLayout>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        <h4>Existing Products</h4>
                        {!products.length ? <h3>No products yet</h3> : (
                            <div>
                                {products.map((r, i) => (
                                    <AquaCategoryCard r={r} key={i}/>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">

                    </div>
                </div>

            </AquaLayout>
        </>
    )
}
export default AquaProductPageComponent