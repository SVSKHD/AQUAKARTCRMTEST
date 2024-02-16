import {Link} from "next/link" 

const NotFound = () =>{
return(
<>
<h1>Not found</h1>
<Link className="btn btn-dark" href="/">Home</Link>
</>
)
}
export default NotFound