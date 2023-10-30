
import Image from "next/image"
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaShare } from "react-icons/fa";

const AquaCategoryCard = ({ handleEdit, handleShare, handleDelete, r }) => {
    const { title, description, photos } = r
    return (
        <>
            <div className="card mb-3 shadow-lg" styles={{ maxWidth: "540px;" }}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <div>
                            <Image
                                src={photos ? photos[0].secure_url : "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"}
                                height="250"
                                width="250"
                                alt="Aquakart"
                                className="rounded-4 shadow-lg m-2"
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <div className="col justify-content-end">
                                <ButtonGroup size="sm">
                                    <Button variant="link" onClick={handleEdit}>
                                        <FaEdit size={25} />
                                    </Button>
                                    <Button variant="link" onClick={handleShare}>
                                        <FaShare size={25} />
                                    </Button>
                                    <Button variant="link" onClick={handleDelete}>
                                        <FaTrash size={25} />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default AquaCategoryCard