import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import DialogModal from "../../../components/modals/DialogModal";
import { isEmptyString, isNullOrUndefined, isSuccessful } from "../../../libs/helper";
import { callPostAddRoleApi } from "../../../services/roleOpsService";

export default function AddRoleModal({ handleClose, isOpen, fetchRoles }: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [roleDetail, setroleDetail] = useState<any>({
    name: "",
  });

  const handleSubmitRole = () => {
    setIsSubmitting(true);
    let modifiedRequest = {
      name: roleDetail.name,
    };

    callPostAddRoleApi(modifiedRequest).then((response: any) => {
      setIsSubmitting(false);
      if (isSuccessful(response?.responseCode)) {
        toast.custom((t) => (
          <Alert
            type="success"
            t={t}
            message={response?.message ?? responseMessages.SUCCESSFUL}
          />
        ));
        handleClose();
        fetchRoles();
      } else {
        toast.custom((t) => (
          <Alert
            type="failed"
            t={t}
            message={response?.message ?? responseMessages.BAD_REQUEST}
          />
        ));
      }
    });
  };

  return (
    <DialogModal
      showFooter={false}
      size="md:w-1/2"
      isModalVisible={isOpen}
      modalTitle="New role details"
      onClosed={handleClose}
    >
      <div className="my-3">
        <div className="mb-2 md:flex md:justify-between md:space-x-2">
          <CustomInput
            value={roleDetail?.name}
            hideableLabelText=""
            fixedLabelText="Role Name"
            onChange={(e: any) => {
              setroleDetail({ ...roleDetail, [e.target.name]: e.target.value });
            }}
            type="text"
            inputFontSize="md:text-sm"
            name="name"
          />
        </div>

        <div>
          <PrimaryButton
            extraDivStyles="w-full my-5"
            disabled={isSubmitting || (isNullOrUndefined(roleDetail.name) || isEmptyString(roleDetail.name))  }
            isLoading={isSubmitting}
            onClicked={handleSubmitRole}
            buttonText="Submit"
            height="py-4"
          />
        </div>
      </div>
    </DialogModal>
  );
}
