import { Fragment } from "react"
import { ChevronLeftIcon } from "../../components/icons/ChevronLeftIcon"
import { ChevronRightIcon } from "../../components/icons/ChevronRightIcon"
import ProductCard from "./ProductCard"

export default function ProductSection({
    title,
    titlebarBgColor="bg-primary-400",
    arrowStrokeColor="black"
}: any) {

    return (
        <div id="product-section" className="my-5">
            <div className={`${titlebarBgColor} h-10 flex text-sm md:text-md p-3 justify-between items-center font-bold rounded-lg`}>
                <p className="w-1/2 truncate">{title}</p>
                <div className="flex justify-end items-center cursor-pointer w-1/2">
                    <p>See all </p>
                    <ChevronRightIcon stroke={arrowStrokeColor} className="w-4 h-4" />
                </div>
            </div>
            <div className="md:grid grid-cols-3 gap-4">
                {[1, 3, 3].map((_items: any, index: number) => {
                    return <Fragment key={`productcard_${index}`}>
                        <ProductCard />
                    </Fragment>
                })}
            </div>
            <div className="flex justify-between w-full">
                <div className="relative right-0 bg-white/50 w-10 h-10 mr-16 rounded-md border-gray-400 flex items-center justify-center text-black cursor-pointer">
                    <ChevronLeftIcon stroke={"black"} className="w-4 h-4" />
                </div>
                <div className="relative right-0 bg-white/50 w-10 h-10 flex rounded-md items-center justify-center text-black cursor-pointer">
                    <ChevronRightIcon stroke={"black"} className="w-4 h-4" />
                </div>
            </div>
        </div>
    )
}