import AquaLayout from "@/components/Layout/Layout"
import InvoiceListCard from "@/components/cards/invoiceListCard"
import AquaInvoiceForm from "@/components/forms/invoiceForm"
import InvoiceOperations from "@/services/invoice"
import { useState, useEffect } from "react"
import AquaToast from "@/components/reusables/toast"


const AquaInvoiceComponent = () => {
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState("")
    const [mode, setMode] = useState("")
    const [invoices, setInvoices] = useState([])
    const { getInvoices, createInvoice, updateInvoice, removeInvoice } = InvoiceOperations()
    const initialData = {
        customerDetails: {
            name: '',
            phone: '',
            email: '',
            address: '',
        },
        gstDetails: {
            gstName: '',
            gstNo: '',
            gstPhone: '',
            gstEmail: '',
            gstAddress: '',
        },
        transport: {
            deliveredBy: '',
            deliveryDate: '',
        },
        gst: false, // Set an initial value for gst
        products: [
            {
                productName: '',
                productQuantity: '',
                productPrice: '',
                productSerialNo: '',
            }
        ],
        paidStatus: '',
        paymentType: '',
    };

    const loadInvoices = () => {
        getInvoices()
            .then((res) => {
                setInvoices(res.data)
                AquaToast("fetched")
            })
            .catch(() => {
                AquaToast("fetched", true)
            })
    }


    useEffect(() => {
        loadInvoices()
    }, [])

    const handleFormSubmit = formData => {
        if (mode) {
            updateInvoice(id, formData)
                .then(() => {

                })
                .catch(() => {

                })
        } else {
            createInvoice(formData)
                .then(() => {
                    setInvoices([])
                    loadInvoices()
                })
                .catch(() => {
                    setInvoices([])
                    loadInvoices()
                })
        }
    };


    const handleEdit = (i, data) => {
        setMode("Edit")
        setId(data._id)
        console.log('edit', mode, i, data , id)
    }

    const deleteInvoice = (i) => {
        console.log(i)
    }

    return (
        <>
            <AquaLayout>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        {invoices.map((r, i) => (
                            <InvoiceListCard handleEdit={()=>handleEdit(i, r)} handleDelete={()=>deleteInvoice(i)} r={r} />
                        ))}

                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                        <AquaInvoiceForm initialData={initialData} mode={mode} onSubmit={handleFormSubmit} />
                    </div>
                </div>

            </AquaLayout>
        </>
    )
}

export default AquaInvoiceComponent