import AquaCardLayover from "../cards/CardLayoutLayover"
import AquaNav from "./Header"


const AquaLayout = (props) => {
    return (
        <>
            <div className="container-fluid mb-1 mt-1">
            <AquaNav />
                <AquaCardLayover>
                    {props.children}
                </AquaCardLayover>

            </div>
        </>
    )
}
export default AquaLayout