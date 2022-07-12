import { Fragment, useState } from "react";
import { uppedCasedFieldsAtSpecificLocationsForProduct } from "../../../common/mocks";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import RequestTypeDropdown from "../../../components/dropdowns/RequestTypeDropdown";
import CustomInput from "../../../components/inputs/CustomInput";
import DialogModal from "../../../components/modals/DialogModal";
import { camelCaseToSentenceCase, setValue, tokenizedUpperCase } from "../../../libs/helper";
import QuantityRequested from "./QuantityRequested";
import ReviewsStar from "./ReviewsStar";

export default function ProductDetailModal({
    showModal = false,
    onClosed,
    data = {},
    quantityAvailable = 0
}: any) {

    const [productDetailUserData, setProductDetailUserData] = useState({
        quantityRequested: 0,
        requestType: {
            label: "",
            value: ""
        },
        fromDate: "",
        toDate: ""
    });
    const reduceQuantuty = () => {
        if (productDetailUserData.quantityRequested === 0) {
            return;
        }
        setProductDetailUserData({
            ...productDetailUserData,
            quantityRequested: (productDetailUserData.quantityRequested - 1)
        });
    }
    const increaseQuantuty = () => {
        if (productDetailUserData.quantityRequested === quantityAvailable) {
            return;
        }
        setProductDetailUserData({
            ...productDetailUserData,
            quantityRequested: (productDetailUserData.quantityRequested + 1)
        });
    }

    return (
        <>
            <DialogModal
                isModalVisible={showModal}
                onClosed={onClosed}
                modalTitle="Product detail"
                showFooter={false}
                size="md:w-3/4"
            >
                <div className="md:grid grid-cols-12 md:space-x-6 gap-y-4 py-4 overflow-y-auto">
                    <div className="w-full col-span-6">
                        <div className="bg-gray-900 h-64 md:h-2/3 rounded-md ">
                            <div className="text-right">

                            </div>
                        </div>
                        <div className="bg-white h-auto rounded-md border-primary-900 border-2 mt-3 ">
                            <div className="p-3 text-left">
                                <QuantityRequested
                                    quantityAvailable={quantityAvailable}
                                    reduceQuantity={reduceQuantuty}
                                    increaseQuantuty={increaseQuantuty}
                                    quantityRequested={productDetailUserData.quantityRequested}
                                />
                                <RequestTypeDropdown
                                    optionTitle="Request Type"
                                    labelTitle="Request Type"
                                    isVisible={true}
                                    value={setValue(productDetailUserData.requestType, "requestType")}
                                    labelClassName="flex justify-start mb-3 text-md mt-2 font-bold"
                                    onChange={(label: any, value: any) => setProductDetailUserData({
                                        ...productDetailUserData,
                                        requestType: {
                                            label: label,
                                            value: value
                                        }

                                    })}
                                />
                                <CustomInput
                                    type="date"
                                    fixedLabelText="From"
                                    labelClassName="text-md"
                                    inputFontSize="text-md"
                                />
                                <CustomInput
                                    type="date"
                                    fixedLabelText="To"
                                    labelClassName="text-md"
                                    inputFontSize="text-md"
                                />
                                <div className="my-3">
                                    <PrimaryButton
                                        onClicked={() => null}
                                        className="w-full font-bold bg-primary-400 text-black rounded-lg border-4 border-secondary-500 cursor-pointer"
                                        buttonText="Add to Cart"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col justify-between">
                            <div className="basis-5/6">

                                {
                                    Object.entries(data).map(([key, value]: any, index: number) => {
                                        return <Fragment key={`productdetailsdata_${index}`}>
                                            <div className="grid grid-cols-12 border-b-2 border-primary-900 py-1">
                                                <div className="col-span-8 font-semibold">{!(Object.keys(uppedCasedFieldsAtSpecificLocationsForProduct).includes(key))
                                                    ? camelCaseToSentenceCase(key) : tokenizedUpperCase(camelCaseToSentenceCase(key), " ", uppedCasedFieldsAtSpecificLocationsForProduct[key])}</div>
                                                <div className="col-span-4 truncate text-right">{key !== "ratings & Reviews" ? value : <ReviewsStar rating={value} />}</div>
                                            </div>
                                        </Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </DialogModal>
        </>
    )
}