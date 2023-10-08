
import Image from "next/image"

const AquaCategoryCard = (props) => {
    const { title, description, images } = props
    return (
        <>
            <div className="card mb-3 shadow-lg" styles={{ maxWidth: "540px;" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <Image
                            src={images?images[0].url:"https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"}
                            height="200"
                            width="200"
                            alt="Aquakart"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AquaCategoryCard