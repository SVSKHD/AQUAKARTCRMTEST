import AquaLayout from "@/components/Layout/Layout"
import AquaRegularCard from "@/components/reusables/card"
import { FaFile, FaList, FaListCheck , FaBarsStaggered , FaHeart , FaBagShopping} from "react-icons/fa6"

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
            name:"Products",
            path:"/products",
            icon:<FaBarsStaggered size={30}/>
        },
        {
            name:"Orders",
            path:"/orders",
            icon:<FaBagShopping size={30}/>
        },
        {
            name:"Wish-List",
            path:"/wishlist",
            icon:<FaHeart size={30}/>
        }
    ]
    return (
        <>
            <AquaLayout>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">

                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                        <h4>Online Menu</h4>
                        <hr />
                        <div className="row">
                            {onlineMenu.map((r, i) => (
                                <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12 mb-2">
                                    <AquaRegularCard title={r.name} >
                                        <a type="button" class="btn" href={r.path}>{r.icon}</a>
                                    </AquaRegularCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AquaLayout>
        </>
    )
}

export default HomeComponent