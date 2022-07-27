import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import UserRoleDropdown from "../../../components/dropdowns/UserRoleDropdown";
import CustomInput from "../../../components/inputs/CustomInput";
import DialogModal from "../../../components/modals/DialogModal";
import { isEmptyString, isNullOrUndefined, isSuccessful, setValue } from "../../../libs/helper";
import { callPutEditUserApi } from "../../../services/userOpsService";

export default function EditUserModal({ handleClose, isOpen, fetchUsers, data }: any) {
  const [formErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<any>({

  });

  const handleEditUser = () => {
    setIsSubmitting(true);
    let modifiedRequest = {
      email: userDetail.emailAddress,
      firstName: userDetail.firstName,
      jobTitle: userDetail.title,
      lastName: userDetail.lastName,
      officePhoneNumber: userDetail.officePhoneNumber,
      userName: userDetail.username,
      businessCategory: userDetail.businessCategory,
      company: userDetail.company,
      description: userDetail.description,
      displayName: userDetail.displayName,
      distinguishedName: userDetail.distinguishedName,
      employeeId: userDetail.employeeId,
      employmentType: userDetail.employmentType,
      location: userDetail.location,
      manager: userDetail.manager,
      managerCN: userDetail.managerCN,
      middleName: userDetail.middleName,
      ou: userDetail.ou,
      physicalDeliveryOfficeName: userDetail.physicalDeliveryOfficeName,
      refIndicator: userDetail.refIndicator,
      userID: userDetail.userID,
      userRole: userDetail.userRole,
      whenChanged: userDetail.whenChanged,
      whenCreated: userDetail.whenCreated,
    };

    callPutEditUserApi(modifiedRequest).then((response: any) => {
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
        fetchUsers();
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

  useEffect(() => {
    if (!isNullOrUndefined(data)) {
      setUserDetail(data);
    }

    return () => {
      setUserDetail({})
    }
  }, [data])


  return (
    <DialogModal
      showFooter={false}
      size="md:w-1/2"
      isModalVisible={isOpen}
      modalTitle="Edit User Details"
      onClosed={handleClose}
    >
      <div className="my-3">
        <div className="mb-2 md:flex">
          <div className="w-full">
            <CustomInput
              value={userDetail?.userName}
              hideableLabelText=""
              fixedLabelText="Username"
              readOnly={true}
              type="text"
              inputFontSize="md:text-sm"
              name="firstName"
            />
          </div>
        </div>
        <div className="mb-2 md:flex md:justify-between md:space-x-2">
          <CustomInput
            value={userDetail?.firstName}
            hideableLabelText=""
            fixedLabelText="Firstname"
            readOnly={true}
            type="text"
            inputFontSize="md:text-sm"
            name="firstName"
          />
          <CustomInput
            value={userDetail?.lastName}
            hideableLabelText=""
            fixedLabelText="Lastname"
            type="text"
            readOnly={true}
            inputFontSize="md:text-sm"
            name="lastName"
          />
        </div>
        <div className="mb-2 md:flex md:justify-between md:space-x-2">
          <CustomInput
            value={userDetail?.officePhoneNumber}
            hideableLabelText=""
            fixedLabelText="Phone number"
            type="text"
            readOnly={true}
            inputFontSize="md:text-sm"
            name="officePhoneNumber"
          />
          <CustomInput
            value={userDetail?.location}
            hideableLabelText=""
            fixedLabelText="User Location"
            readOnly={true}
            type="text"
            inputFontSize="md:text-sm"
            name="location"
            error={{
              hasError: formErrors.location,
              message: formErrors.location,
            }}
          />
        </div>

        <div>
          <UserRoleDropdown
            optionTitle="User Role"
            labelTitle="User Role"
            labelClassName="font-bold text-sm mb-3"
            isVisible={true}
            value={setValue(userDetail?.userRole)}
            onChange={(e: any) =>
              setUserDetail({
                ...userDetail,
                userRole: e.target.value,
              })
            }
          />
        </div>
        <div>
          <PrimaryButton
            extraDivStyles="w-full my-5"
            disabled={
              isSubmitting
                ? isSubmitting
                : isNullOrUndefined(userDetail.userRole) || isEmptyString(userDetail.userRole)
            }
            isLoading={isSubmitting}
            onClicked={handleEditUser}
            buttonText="Submit"
            height="py-4"
          />
        </div>
      </div>
    </DialogModal>
  );
}
