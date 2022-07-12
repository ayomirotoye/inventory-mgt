import { AiFillQuestionCircle, AiOutlineClose } from "react-icons/ai";
import colors from "tailwindcss/colors";
import PrimaryButton from "../buttons/PrimaryButton";
import { ApproveIcon } from "../icons/ApproveIcon";
import DialogModal from "./DialogModal";

export default function ConfirmationModal({
    showModal = false,
    modalTitle = "Are you sure ?",
    onClosed
}: any) {

    return (
        <DialogModal
            modalTitle={modalTitle}
            size="md:w-1/3"
            isModalVisible={showModal}
            showFooter={true}
            onClosed={onClosed}
            showFooterComponent={
                <div className="grid grid-cols-2 space-x-2 my-2">
                    <PrimaryButton
                        onClicked={onClosed}
                        height="py-2 px-3 mb-2 md:mb-0"
                        className="w-full font-bold bg-white text-black rounded-lg border-2 border-red-900 cursor-pointer"
                    >
                        <span className="flex justify-between inline-block align-middle items-center">
                            <AiOutlineClose fill={colors.red[900]} strokeWidth={10} className="h-5 w-5" />
                            Close
                        </span>
                    </PrimaryButton>
                    <PrimaryButton
                        onClicked={onClosed}
                        height="py-2 px-3 mb-2 md:mb-0"
                        className="w-full font-bold bg-primary-400 text-black rounded-lg border-2 border-red-900 cursor-pointer"
                    >
                        <span className="flex justify-between inline-block align-middle items-center">
                            <ApproveIcon fill={colors.green[900]} className="h-4 w-4" />
                            Continue
                        </span>
                    </PrimaryButton>
                </ div>
            }
        >

            <div className="flex items-center justify-center h-56">
                <div className="text-center">
                    <AiFillQuestionCircle fontSize={200} fill={colors.yellow[900]} />
                </div>
            </div>
        </DialogModal>
    )
}