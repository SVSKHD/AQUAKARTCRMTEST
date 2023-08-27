import AquaLayout from "@/components/Layout/Layout"
import AquaInvoiceForm from "@/components/forms/invoiceForm"
import { useState } from "react"
const AquaInvoiceComponent = () => {
    const [edit, setEdit] = useState(false)
    return (
        <>
            <AquaLayout>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">

                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                        <AquaInvoiceForm title={edit ? "Edit Invoice" : "Create Invoice"} />
                    </div>
                </div>

            </AquaLayout>
        </>
    )
}

export default AquaInvoiceComponent