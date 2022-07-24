import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { isSuccessful } from "../../../libs/helper";
import { callDeleteUsersApi } from "../../../services/userOpsService";

export default function DeleteUserModal({ handleClose,
    isOpen,
    userId,
    fetchUsers
}: any) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const handleDeleteUser = () => {
        setIsSubmitting(true);

        callDeleteUsersApi(userId).then((response: any) => {
            setIsSubmitting(false);
            if (isSuccessful(response?.responseCode)) {
                toast.custom((t) => <Alert type="success" t={t}
                    message={response?.responseMessage ?? responseMessages.SUCCESSFUL} />);
                handleClose();
                fetchUsers();
            } else {
                toast.custom((t) => <Alert type="failed" t={t}
                    message={response?.responseMessage ?? responseMessages.BAD_REQUEST} />);
            }
        })
    }


    return (

        <ConfirmationModal
            modalTitle="Are you sure ?"
            onClosed={handleClose}
            showModal={isOpen}
            onConfirm={handleDeleteUser}
            isConfirming={isSubmitting}
        />
    )
}