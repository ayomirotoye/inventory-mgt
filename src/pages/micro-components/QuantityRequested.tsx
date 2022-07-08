import { ChevronLeftIcon } from "../../components/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../components/icons/ChevronRightIcon";
import ViewText from "../../components/texts/view-text";

export default function QuantityRequested({
    quantityAvailable=0,
    reduceQuantity,
    increaseQuantuty,
    quantityRequested=0
}: any) {

    return (
        <div className="grid grid-cols-2">
            <div className="col-span-1 flex items-center ">
                <ViewText textValue="Quantity Requested" size="text-md" />
            </div>
            <div className="col-span-1 flex justify-start space-x-2 items-center">
                <ChevronLeftIcon
                    stroke="#000000"
                    className="w-4 h-5 cursor-pointer"
                    onClick={reduceQuantity}
                />
                <span className="text-md">{quantityRequested}</span>
                <ChevronRightIcon
                    stroke="#000000"
                    className="w-4 h-4 cursor-pointer"
                    onClick={increaseQuantuty}
                />
                <div className="w-1/3 flex justify-center items-center text-xs"> of </div>
                <div className="w-1/3">
                    <ViewText textValue={quantityAvailable} className="text-3xl" />
                </div>
            </div>
        </div>
    )
}