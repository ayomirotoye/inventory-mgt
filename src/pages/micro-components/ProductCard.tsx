import { useState } from "react";
import { productDataMock } from "../../common/mocks";
import { CartIcon } from "../../components/icons/CartIcon";
import { theme } from "../../tailwind.config";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductCard({
    // productName,
    // productuantity,
    // productDescription
}: any) {

    const [showProductDetail, setShowProductDetail] = useState(false);

    const toggleShowProductDetail = () => {
        setShowProductDetail(!showProductDetail);
    }
    return (
        <>
            <div className="h-1/3">
                <div className="w-full rounded-lg bg-gray-100 overflow-hidden shadow-xl h-64 my-3 rounded-t-lg bg-no-repeat bg-center bg-cover cursor-pointer">
                    <div className="bg-gray-900 h-3/4">
                        <div className="text-right">
                            <button className="text-pink-500 hover:text-pink-600 p-2 rounded-full bg-gray-400 z-[1000] m-3" onClick={toggleShowProductDetail}>
                                <CartIcon fill={theme.extend.colors.secondary[900]} className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="bg-white-900 h-1/4 flex justify-between items-center ">
                        <div className="p-3 truncate w-1/2">
                            <p className="font-bold text-md overflow-x-auto">Product name</p>
                            <p className="text-xs overflow-x-auto">Product description</p>
                        </div>
                        <div className=" p-3">
                            <span className="px-4 py-3 rounded-full border-4 border-primary-900 font-bold text-lg">
                                1
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {showProductDetail && <ProductDetailModal
                showModal={showProductDetail}
                data={productDataMock}
                onClosed={toggleShowProductDetail}
            />}
        </>

    )
}