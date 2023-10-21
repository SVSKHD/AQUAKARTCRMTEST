import AquaLayout from "@/components/Layout/Layout"
import AquaRegularCard from "@/components/reusables/card"
import AquaPlaceholder from "@/components/reusables/placeHolder"
import { FaFile, FaList, FaListCheck, FaBarsStaggered, FaHeart, FaBagShopping } from "react-icons/fa6"

const HomeComponent = () => {
    const onlineMenu = [
        {
            name: "Categories",
            path: "/category",
            icon: <FaList size={30} />
        },
        {
            name: "Invoices",
            path: "/invoices",
            icon: <FaFile size={30} />
        },
        {
            name: "Sub-Categories",
            path: "/subcategory",
            icon: <FaListCheck size={30} />
        },
        {
            name: "Products",
            path: "/product",
            icon: <FaBarsStaggered size={30} />
        },
        {
            name: "Orders",
            path: "/orders",
            icon: <FaBagShopping size={30} />
        },
        {
            name: "Wish-List",
            path: "/wishlist",
            icon: <FaHeart size={30} />
        }
    ]
    return (
        <>
            <AquaLayout>
                <div className="row mb-2">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">

                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                        <div className="mb-2">
                            <h4>Online Menu</h4>
                            <hr />
                            <div className="row mb-4">
                                {onlineMenu.map((r, i) => (
                                    <div key={i} className="col-md-4 col-lg-4 col-xs-12 col-sm-12 mb-2">
                                        <AquaRegularCard title={r.name} >
                                            <a type="button" class="btn" href={r.path}>{r.icon}</a>
                                        </AquaRegularCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4>Users and User Status</h4>
                            <hr />
                            <AquaPlaceholder
                                type="Users-No"
                                size={1.3}
                                name="users no"
                            />
                        </div>
                    </div>
                </div>

            </AquaLayout>
        </>
    )
}

export default HomeComponent