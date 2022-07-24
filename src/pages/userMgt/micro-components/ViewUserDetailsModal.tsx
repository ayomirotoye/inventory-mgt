import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import UserRoleDropdown from "../../../components/dropdowns/UserRoleDropdown";
import CustomInput from "../../../components/inputs/CustomInput";
import SearchInput from "../../../components/inputs/SearchInput";
import DialogModal from "../../../components/modals/DialogModal";
import { hasKeys, isSuccessful, setValue } from "../../../libs/helper";
import { Fragment } from "react";
import { camelCaseToSentenceCase } from "../../../libs/helper";
import {
  callGetUserByUsernameApi,
  callPostAddUserApi,
} from "../../../services/userOpsService";

export default function ViewUserDetailsModal({
  handleClose,
  isOpen,
  fetchUsers,
}: any) {
  const [formErrors] = useState<any>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUserPresent, setIsUserPresent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<any>({
    description: "",
    displayName: "",
    distinguishedName: "",
    emailAddress: "",
    name: "",
    employeeId: null,
    givenName: "",
    middleName: null,
    title: "",
    surname: "",
    samAccountName: "",
    photoData: null,
    ou: "",
    location: "",
    company: "",
    businessCategory: "",
    physicalDeliveryOfficeName: "",
    telephoneNumber: "",
    whenCreated: "",
    whenChanged: "",
    mail: "",
    employmentType: "",
    manager: "",
    managerCN: "",
    shellGGDDepartmentNumber: "",
  });

  const onClick = () => {
    setIsSearching(true);
    setIsUserPresent(false);
    callGetUserByUsernameApi(userDetail.username).then((response: any) => {
      setIsSearching(false);
      if (hasKeys(response.userData)) {
        setIsUserPresent(true);
        const userDetailsUpdated = { ...userDetail, ...response.userData };
        setUserDetail(userDetailsUpdated);
      }
    });
  };

  const handleSubmitUser = () => {
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
      userRole: {
        id: userDetail.userRole.value,
        name: userDetail.userRole.label,
      },
      whenChanged: userDetail.whenChanged,
      whenCreated: userDetail.whenCreated,
    };

    callPostAddUserApi(modifiedRequest).then((response: any) => {
      console.log("response::", response);
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

  return (
    <DialogModal
      showFooter={false}
      size="md:w-1/2"
      isModalVisible={isOpen}
      modalTitle="New user details"
      onClosed={handleClose}
    >
      <div className="md:grid grid-cols-12 md:space-x-6 gap-y-4 py-4">
        <div className="w-full col-span-6">
          {Object.entries(userDetail).map(
            ([key, value]: any, index: number) => {
              return (
                <Fragment key={`productdetailsdata_${index}`}>
                  <div className="grid grid-cols-12 border-b-2 border-primary-900 py-1">
                    <div className="col-span-8 font-semibold">
                      {camelCaseToSentenceCase(key)}
                    </div>
                    <div className="col-span-4 truncate text-right">
                      {value}
                    </div>
                  </div>
                </Fragment>
              );
            }
          )}
        </div>
      </div>
    </DialogModal>
  );
}
