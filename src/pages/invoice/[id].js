import DynamicInvoice from "@/PageComponents/Invoices/dynamicInvoice";

const AquaDyanamicInvoices = ({ params }) => {
  return (
    <>
      <DynamicInvoice id={params.id} />
    </>
  );
};

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

export default AquaDyanamicInvoices;
