import PageWrapper from "../animations/pageWrapper"

const AquaCardLayover = (props) => {
    return (
        <>
            <div className="card shadow-lg">
                <div className="card-body text-dark">
                    <PageWrapper> {props.children}</PageWrapper>
                </div>
            </div>
        </>
    )
}
export default AquaCardLayover