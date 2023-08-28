import { useState, useEffect } from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import AquaInput from "../reusables/input"
import { FaTrash, FaEdit } from "react-icons/fa"
import AquaPlaceHolderInput from "../reusables/placeHolderInput"
const AquaInvoiceForm = ({ initialData, mode, onSubmit }) => {

    const [formData, setFormData] = useState(initialData);

    // const handleInputChange = (section, field, value) => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [section]: {
    //             ...prevData[section],
    //             [field]: value,
    //         },
    //     }));
    // };

    const handleInputChange = (e, section, field, index) => {
        const updatedFormData = { ...formData };
        if (section === 'products') {
            updatedFormData[section][index][field] = e.target.value;
        } else {
            updatedFormData[section][field] = e.target.value;
        }
        setFormData(updatedFormData);
    };

    //product array operations
    const handleProductAdd = () => {
        const updatedFormData = { ...formData };
        updatedFormData.products.push({
            productName: '',
            productQuantity: '',
            productPrice: '',
            productSerialNo: '',
        });
        setFormData(updatedFormData);
    };

    const handleRemoveProduct = (index) => {
        setFormData((prevData) => {
            const newProducts = [...prevData.products];
            newProducts.splice(index, 1);
            return {
                ...prevData,
                products: newProducts,
            };
        });
    };



    const handleToggleChange = () => {
        setFormData(prevData => ({
            ...prevData,
            gst: !prevData.gst,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(formData);
    };
    return (
        <>
            <h4>{mode === 'Edit' ? "Edit Invoice" : "Create Invoice"}</h4>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">

                    <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                        <h6>Customer Details</h6>
                        <AquaInput
                            type="text"
                            label="Name"
                            placeholder="Customer-Name"
                            value={formData.customerDetails.name}
                            handleChange={e => handleInputChange(e, 'customerDetails', 'name')}
                        />
                        <AquaInput
                            type="text"
                            label="Phone"
                            placeholder="Customer-Phone"
                            value={formData.customerDetails.phone}
                            handleChange={e => handleInputChange(e, 'customerDetails', 'phone')}
                        />
                        <AquaInput
                            type="text"
                            label="Email"
                            placeholder="Customer-email"
                            value={formData.customerDetails.email}
                            handleChange={e => handleInputChange(e, 'customerDetails', 'email')}
                        />
                        <AquaInput
                            Address={true}
                            type="text"
                            label="Address"
                            placeholder="Customer-Address"
                            value={formData.customerDetails.address}
                            handleChange={e => handleInputChange(e, 'customerDetails', 'address')}
                        />
                    </div>
                    <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                value={formData.gst}
                                onChange={handleToggleChange}
                            />
                        </div>
                        {formData.gst ? (<>
                            <div>
                                <h6>Customer Gst Details</h6>
                                <AquaInput
                                    type="text"
                                    label="Gst-Name"
                                    placeholder="Customer-GST-Name"
                                    value={formData.gstDetails.gstName}
                                    handleChange={e => handleInputChange(e, 'gstDetails', 'gstName')}
                                />
                                <AquaInput
                                    type="text"
                                    label="Gst-No"
                                    placeholder="Customer-Gst-No"
                                    value={formData.gstDetails.gstNo}
                                    handleChange={e => handleInputChange(e, 'gstDetails', 'gstNo')}
                                />
                                <AquaInput
                                    type="text"
                                    label="Gst-Phone"
                                    placeholder="Customer-Gst-Phone"
                                    value={formData.gstDetails.gstPhone}
                                    handleChange={e => handleInputChange(e, 'gstDetails', 'gstPhone')}
                                />
                                <AquaInput
                                    type="text"
                                    label="Gst-Email"
                                    placeholder="Customer-Gst-email"
                                    value={formData.gstDetails.gstEmail}
                                    handleChange={e => handleInputChange(e, 'gstDetails', 'gstEmail')}
                                />
                                <AquaInput
                                    Address={true}
                                    type="text"
                                    label="Gst-Address"
                                    placeholder="Customer-Gst-Address"
                                    value={formData.gstDetails.gstAddress}
                                    handleChange={e => handleInputChange(e, 'gstDetails', 'gstAddress')}
                                />

                            </div>
                        </>) : (<>
                            <h6>No Gst details yet</h6>
                        </>)}

                    </div>

                </div>
                <hr />
                <div className="row">
                    <div className="col"><h6>Product Details</h6></div>
                    <div className="col">{formData.products.length > 1 ? (<><h6>Add Button inside table row</h6></>) : (<><Button onClick={handleProductAdd}>Add</Button></>)}</div>
                </div>

                <hr />
                {formData.products.length > 1 ? (
                    <>
                        {formData.products.map((r, i) => (
                            <>
                                <div className="row" key={i}>
                                    <div className="col-lg-2 col-md-2">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Name" value={r.productName}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productName', i)} />
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Quantity" value={r.productQuantity}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productQuantity', i)} />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Price" value={r.productPrice}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productPrice', i)} />
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Serials" value={r.productSerialNo}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productSerialNo', i)} />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <ButtonGroup aria-label="Basic example" size="sm">
                                            <Button variant="dark"><FaEdit size={25} /></Button>
                                            <Button variant="danger" onClick={() => handleRemoveProduct(i)}><FaTrash size={25} /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                ) : (
                    <>
                        {formData.products.map((r, i) => (
                            <>
                                <div className="row" key={i}>
                                    <div className="col-lg-3 col-md-3">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Name" value={r.productName}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productName', i)} />
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Quantity" value={r.productQuantity}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productQuantity', i)} />
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Price" value={r.productPrice}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productPrice', i)} />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <AquaPlaceHolderInput type="text" class="form-control" placeholder="Product Serials" value={r.productSerialNo}
                                            handleChange={(e) => handleInputChange(e, 'products', 'productSerialNo', i)} />
                                    </div>
                                    <div className="col-lg-1 col-md-1">
                                        <Button type="button" variant="danger" onClick={() => handleRemoveProduct(i)}><FaTrash size={20} /></Button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                )}
                <hr />
                <div className="row">
                    <div className="col">
                        <h6>Transport details</h6>
                        <AquaInput
                            label={"Delivery Status"}
                            placeholder={"Enter Delivery Status"}
                            type={"name"}
                            value={formData.transport.deliveredBy}
                            handleChange={(e) => handleInputChange(e, 'transport', 'deliveredBy')}
                        />
                        <AquaInput
                            label={"Delivery Date and time"}
                            placeholder={"Enter Delivery date and time"}
                            type={"number"}
                            value={formData.transport.deliveryDate}
                            handleChange={(e) => handleInputChange(e, 'transport', 'deliveryDate')}
                        />
                    </div>
                    <div className="col">
                        <h6>Payment details</h6>
                        <AquaInput
                            label={"Transfer Type"}
                            placeholder={"Enter Transfer Type"}
                            type={"name"}
                            value={formData.paidStatus}
                            handleChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                paidStatus: e.target.value,
                            }))}
                        />
                        <AquaInput
                            label={"Paid Status"}
                            placeholder={"Enter Paid Status"}
                            type={"name"}
                            value={formData.paymentType}
                            handleChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                paymentType: e.target.value,
                            }))}
                        />
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="primary" size="lg">
                        {mode === 'edit' ? "Edit Invoice" : "Create Invoice"}
                    </Button>
                </div>
            </form>
        </>
        // {/* <>
        // <form onSubmit={handleSubmit}>
        //       {/* Customer Details */}
        //       <AquaInput
        //         type="text"
        //         label="Name"
        //         placeholder="Customer-Name"
        //         value={formData.customerDetails.name}
        //         onChange={e => handleInputChange('customerDetails', 'name', e.target.value)}
        //       />
        //       {/* ... Other fields */}

        //       {/* GST Details */}
        //       <input
        //         type="text"
        //         value={formData.gstDetails.gstName}
        //         onChange={e => handleInputChange('gstDetails', 'gstName', e.target.value)}
        //       />
        //       {/* ... Other fields */}

        //       {/* Products */}
        //       {formData.products.map((product, index) => (
        //         <div key={index}>
        //           <input
        //             type="text"
        //             value={product.productName}
        //             onChange={e => handleInputChange('products', index, { ...product, productName: e.target.value })}
        //           />
        //           {/* ... Other product fields */}
        //         </div>
        //       ))}

        //       {/* Submit Button */}
        //       <button type="submit">{mode === 'create' ? 'Create' : 'Save Changes'}</button>
        //     </form>
        // </> */}
    )
}
export default AquaInvoiceForm