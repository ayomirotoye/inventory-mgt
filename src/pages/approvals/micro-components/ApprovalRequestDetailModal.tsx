import { Fragment } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DialogModal from "../../../components/modals/DialogModal";
import { camelCaseToSentenceCase } from "../../../libs/helper";


export default function ApprovalRequestDetailModal({
    showModal = false,
    onClosed,
    size = "md:w-3/4",
    data = {}
}: any) {

    return (
        <>
            <DialogModal
                isModalVisible={showModal}
                onClosed={onClosed}
                modalTitle="Approval Request detail"
                showFooter={false}
                size={size}
            >
                <div className="md:grid grid-cols-12 md:space-x-6 gap-y-4 py-4">
                    <div className="w-full col-span-6">
                        {
                            Object.entries(data).map(([key, value]: any, index: number) => {
                                return <Fragment key={`productdetailsdata_${index}`}>
                                    <div className="grid grid-cols-12 border-b-2 border-primary-900 py-1">
                                        <div className="col-span-8 font-semibold">{camelCaseToSentenceCase(key)}</div>
                                        <div className="col-span-4 truncate text-right">{value}</div>
                                    </div>
                                </Fragment>
                            })
                        }
                    </div>
                    <div className="w-full col-span-6">
                        <div className="bg-gray-900 h-64 md:h-2/3 rounded-md ">
                            <div className="text-right">

                            </div>
                        </div>
                        <div className="my-3 flex space-x-3 justify-between ">
                            <PrimaryButton
                                onClicked={() => null}
                                className="w-full font-bold bg-secondary-500 text-white rounded-lg border-4 border-secondary-500 cursor-pointer"
                                buttonText="Reject"
                            />
                            <PrimaryButton
                                onClicked={() => null}
                                className="w-full font-bold bg-primary-400 text-black rounded-lg border-4 border-secondary-500 cursor-pointer"
                                buttonText="Approve"
                            />
                        </div>
                    </div>

                </div>
            </DialogModal>
        </>
    )
}