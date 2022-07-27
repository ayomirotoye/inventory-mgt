import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { isSuccessful } from "../../../libs/helper";
import { callDeleteRolesApi } from "../../../services/roleOpsService";

export default function DeleteRoleModal({
  handleClose,
  isOpen,
  roleId,
  fetchRoles,
}: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDeleteRole = () => {
    setIsSubmitting(true);

    callDeleteRolesApi(roleId).then((response: any) => {
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
        fetchRoles();
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
      onConfirm={handleDeleteRole}
      isConfirming={isSubmitting}
    />
  );
}
