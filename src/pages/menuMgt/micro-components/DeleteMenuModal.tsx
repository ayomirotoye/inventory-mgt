import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { isSuccessful } from "../../../libs/helper";
import { callDeleteMenusApi } from "../../../services/MenuOpsService";

export default function DeleteMenuModal({
  handleClose,
  isOpen,
  userId,
  fetchMenus,
}: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDeleteMenu = () => {
    setIsSubmitting(true);

    callDeleteMenusApi(userId).then((response: any) => {
      setIsSubmitting(false);
      if (isSuccessful(response?.responseCode)) {
        toast.custom((t) => (
          <Alert
            type="success"
            t={t}
            message={response?.responseMessage ?? responseMessages.SUCCESSFUL}
          />
        ));
        handleClose();
        fetchMenus();
      } else {
        toast.custom((t) => (
          <Alert
            type="failed"
            t={t}
            message={response?.responseMessage ?? responseMessages.BAD_REQUEST}
          />
        ));
      }
    });
  };

  return (
    <ConfirmationModal
      modalTitle="Are you sure ?"
      onClosed={handleClose}
      showModal={isOpen}
      onConfirm={handleDeleteMenu}
      isConfirming={isSubmitting}
    />
  );
}
