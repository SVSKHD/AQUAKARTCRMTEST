import { useState, useEffect } from "react"
import DynamicInvoiceCard from "@/components/cards/dynamicInvoiceCard"
import InvoiceOperations from "@/services/invoice";
import AquaLists from "@/components/reusables/AquaLists";

const DynamicInvoice = ({ id }) => {
    const [invoice, setInvoice] = useState("");
    const [gst, setGst] = useState(false)
    const { getIndividualInvoice } = InvoiceOperations()
    const getInvoiceById = async (id) => {
        await getIndividualInvoice(id).then((res) => {
            if (res) {
                setInvoice(res.data)
                setGst(res.data.gst)
            }
        })
    }
    useEffect(() => {
        getInvoiceById(id)
    }, [])

    let termsAndConditions = [
        {
            title: "Transport",
            description: "TRANSPORT / LIFTING CHARGES WILL BE BORN BY THE CUSTOMER.",
        },
        {
            title: "Plumber",
            description:
                " PLUMBER SHOULD BE PROVIDED AT THE TIME OF INSTALLATION (OR) OUR PLUMBERS MIGHT ATTRACT PLUMBING CHARGES.",
        },
        {
            title: "Plumbing Material",
            description:
                "PLUMBING MATERIALS / ELECTRICAL CONNECTION BY CUSTOMER, Plumbing MATERIAL.",
        },
        {
            title: "Electric Socket If purchased Auto Softener",
            description:
                "ONE ELECTRIC SOCKET HAS TO BE PROVIDED AT THE TIME OF INSTALLATION, IF PRESSURE BOOSTER THEN TWO ELECTRIC SOCKETS.",
        },
        {
            title: "Delivery and Installation policy",
            description: "DELIVERY / INSTALLATION COMPLETED WITHIN 7 WORKING DAYS. ",
        },
        { title: "Advance policy", description: "100% ADVANCE ALONG WITH PO." },
        {
            title: "Work Monitoring",
            description: "PLUMBING WORK MONITORING WILL BE DONE BY OUR ENGINEERS",
        },
    ];
    return (
        <>
            <div className="container">
                <div className="custom-dynamic-invoice" />
                <DynamicInvoiceCard>
                    {termsAndConditions.map((r, i) => (
                        <AquaLists
                            key={i}
                            title={r.title}
                            description={r.description}
                            number={i + 1}
                        />
                    ))}
                </DynamicInvoiceCard>
            </div>
        </>
    )
}
export default DynamicInvoice