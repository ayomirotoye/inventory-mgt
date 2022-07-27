import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import DialogModal from "../../../components/modals/DialogModal";
import { isSuccessful } from "../../../libs/helper";
import { callPostAddMenuApi } from "../../../services/MenuOpsService";

export default function AddMenuModal({ handleClose, isOpen, fetchMenus }: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [menuDetail, setMenuDetail] = useState<any>({
    id: "",
    title: "",
  });

  const handleSubmitMenu = () => {
    setIsSubmitting(true);
    let modifiedRequest = {
      title: menuDetail.title,
    };

    callPostAddMenuApi(modifiedRequest).then((response: any) => {
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
        fetchMenus();
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
      modalTitle="New Menu Details"
      onClosed={handleClose}
    >
      <div className="my-3">
        <div className="mb-2 md:flex md:justify-between md:space-x-2">
          <CustomInput
            value={menuDetail?.title}
            hideableLabelText=""
            fixedLabelText="Menu Name"
            onChange={(e: any) => {
              setMenuDetail({ ...menuDetail, [e.target.name]: e.target.value });
            }}
            type="text"
            inputFontSize="md:text-sm"
            name="title"
          />
        </div>

        <div>
          <PrimaryButton
            extraDivStyles="w-full my-5"
            isLoading={isSubmitting}
            onClicked={handleSubmitMenu}
            buttonText="Submit"
            height="py-4"
          />
        </div>
      </div>
    </DialogModal>
  );
}
