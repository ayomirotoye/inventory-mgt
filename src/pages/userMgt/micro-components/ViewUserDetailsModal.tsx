import { format } from "date-fns";
import { Fragment } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DialogModal from "../../../components/modals/DialogModal";
import StatusBadge from "../../../components/badges/StatusBadge";
import { camelCaseToSentenceCase } from "../../../libs/helper";

export default function ViewUserDetailsModal({
  handleClose,
  handleEditUserDetails,
  isOpen,
  data,
}: any) {

  return (
    <DialogModal
      showFooter={true}
      size="md:w-1/2"
      isModalVisible={isOpen}
      modalTitle={"User details : ".concat(data?.userName)}
      onClosed={handleClose}
      showFooterComponent={
        <div className="flex space-x-2">
          <PrimaryButton
            buttonText='Close'
            onClicked={handleClose}
            className="w-full font-bold bg-gray-400 text-primary-900 rounded-lg border-0 cursor-pointer py-2 px-4"
            extraDivStyles={"w-full"} />
          <PrimaryButton
            buttonText='Edit'
            onClicked={handleEditUserDetails}
            height="py-2 px-4"
            extraDivStyles={"w-full"} />
        </div>
      }
    >
      <div className="flex flex-col justify-between">
        <div className="basis-5/6">
          {
            Object.entries(data).map(([key, value]: any, index: number) => {
              return <Fragment key={`userdetailsdata_${index}`}>
                <div className="grid grid-cols-12 border-b-2 border-primary-900 py-1">
                  <div className="col-span-4 font-semibold">{camelCaseToSentenceCase(key)}</div>
                  <div className="col-span-8 truncate text-right">{(key !== "createdDate" && key !== "status") ? value : key === "createdDate" ? format(new Date(value), "LLLL") : <StatusBadge />}</div>
                </div>
              </Fragment>
            })
          }
        </div>
      </div>
    </DialogModal >
  );
}
