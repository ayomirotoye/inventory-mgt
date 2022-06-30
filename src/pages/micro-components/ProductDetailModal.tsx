import { Fragment } from "react";
import { uppedCasedFieldsAtSpecificLocationsForProduct } from "../../common/mocks";
import DialogModal from "../../components/modals/DialogModal";
import { camelCaseToSentenceCase, tokenizedUpperCase } from "../../libs/helper";
import ReviewsStar from "./ReviewsStar";

export default function ProductDetailModal({
    showModal = false,
    onClosed,
    data = {}
}: any) {

    return (
        <>
            <DialogModal
                isModalVisible={showModal}
                onClosed={onClosed}
                modalTitle="Product detail"
                showFooter={false}
                size="md:w-3/4"
            >
                <div className="md:flex justify-between md:space-x-6 py-4">
                    <div className="w-full md:w-1/2">
                        <div className="bg-gray-900 h-64 md:h-2/3 rounded-md ">
                            <div className="text-right">

                            </div>
                        </div>
                        <div className="bg-white h-48 md:h-1/3 rounded-md border-primary-900 border-2 mt-3 ">

                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
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
            </DialogModal>
        </>
    )
}