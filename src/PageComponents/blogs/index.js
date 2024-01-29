import AquaLayout from "@/components/Layout/Layout"
import AquaBlogForm from "@/components/forms/blogForm"
import {useState} from "react"

const AquaBlogComponent = () =>{
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        keywords: '',
        notes: "",
        stock: "",
        brand: "",
        ratings: "",
        numberOfReviews: "",
        // Initialize other fields as needed
    });
    const handleSubmit = (formValues) =>{
        console.log("values" , formValues)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
return(
    <AquaLayout>
        <div className="row">
          <div className="col-4">
            <h4>Blogs list</h4>
          </div>
          <div className="col-8">
            <AquaBlogForm data={formValues} onSubmit={handleSubmit}/>
          </div>
        </div>
    </AquaLayout>
)
}
export default AquaBlogComponent