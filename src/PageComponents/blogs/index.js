import AquaLayout from "@/components/Layout/Layout"
import AquaBlogForm from "@/components/forms/blogForm"

const AquaBlogComponent = () =>{
return(
    <AquaLayout>
        <div className="row">
          <div className="col-4">
            <h4>Blogs list</h4>
          </div>
          <div className="col-8">
            <AquaBlogForm/>
          </div>
        </div>
    </AquaLayout>
)
}
export default AquaBlogComponent