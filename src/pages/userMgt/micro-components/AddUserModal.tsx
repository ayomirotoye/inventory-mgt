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
import { callGetUserByUsernameApi, callPostAddUserApi } from "../../../services/userOpsService";

export default function AddUserModal({ handleClose, isOpen }: any) {
    const [formErrors] = useState<any>({});
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isUserPresent, setIsUserPresent] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<any>({
        "description": "",
        "displayName": "",
        "distinguishedName": "",
        "emailAddress": "",
        "name": "",
        "employeeId": null,
        "givenName": "",
        "middleName": null,
        "title": "",
        "surname": "",
        "samAccountName": "",
        "photoData": null,
        "ou": "",
        "location": "",
        "company": "",
        "businessCategory": "",
        "physicalDeliveryOfficeName": "",
        "telephoneNumber": "",
        "whenCreated": "",
        "whenChanged": "",
        "mail": "",
        "employmentType": "",
        "manager": "",
        "managerCN": "",
        "shellGGDDepartmentNumber": "",
    });

    const onClick = () => {
        setIsSearching(true);
        setIsUserPresent(false);
        callGetUserByUsernameApi(userDetail.username).then((response: any) => {
            setIsSearching(false);
            if (hasKeys(response.userData)) {
                setIsUserPresent(true);
                const userDetailsUpdated = { ...userDetail, ...response.userData };
                console.log("userDetailsUpdated::", userDetailsUpdated)
                setUserDetail(userDetailsUpdated);
            }
        })
    }

    const handleSubmitUser = () => {
        setIsSubmitting(true);
        let modifiedRequest = {
            email: userDetail.emailAddress,
            firstName: userDetail.firstName,
            jobTitle: userDetail.title,
            lastName: userDetail.lastName,
            officePhoneNumber: userDetail.officePhoneNumber,
            userName: userDetail.username,
            "businessCategory": userDetail.businessCategory,
            "company": userDetail.company,
            "description": userDetail.description,
            "displayName": userDetail.displayName,
            "distinguishedName": userDetail.distinguishedName,
            "employeeId": userDetail.employeeId,
            "employmentType": userDetail.employmentType,
            "location": userDetail.location,
            "manager": userDetail.manager,
            "managerCN": userDetail.managerCN,
            "middleName": userDetail.middleName,
            "ou": userDetail.ou,
            "physicalDeliveryOfficeName": userDetail.physicalDeliveryOfficeName,
            "refIndicator": userDetail.refIndicator,
            "userID": userDetail.userID,
            "userRole": {
                "id": userDetail.userRole.value,
                "name": userDetail.userRole.label
            },
            "whenChanged": userDetail.whenChanged,
            "whenCreated": userDetail.whenCreated
        };

        callPostAddUserApi(modifiedRequest).then((response: any) => {
            console.log("response::", response);
            setIsSubmitting(false);
            if (isSuccessful(response?.responseCode)) {
                toast.custom((t) => <Alert type="success" t={t}
                    message={response?.message ?? responseMessages.SUCCESSFUL} />);
                    handleClose();
            } else {
                toast.custom((t) => <Alert type="failed" t={t}
                    message={response?.message ?? responseMessages.BAD_REQUEST} />);
            }
        })
    }


    return (

        <DialogModal
            showFooter={false}
            size="md:w-1/2"
            isModalVisible={isOpen}
            modalTitle="New user details"
            onClosed={handleClose}
        >
            <div className="my-3">
                <div className="mb-2 md:flex">
                    <div className="w-full">
                        <span>Username</span>
                        <SearchInput
                            searchQuery={userDetail?.username ?? ""}
                            onChangeInput={(e: any) => {
                                setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                            }}
                            name="username"
                            handleClick={onClick}
                            widthClass="w-full border-2 border-primary-900 rounded-md my-2"
                            isSearching={isSearching}
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
                        onChange={(label: any, value: any) => setUserDetail({
                            ...userDetail, userRole: {
                                label: label,
                                value: value
                            }
                        })}
                    />
                </div>
                <div>
                    <PrimaryButton
                        extraDivStyles="w-full my-5"
                        disabled={isSubmitting ? isSubmitting : (isUserPresent && hasKeys(userDetail.userRole)) ? false : true}
                        isLoading={isSubmitting}
                        onClicked={handleSubmitUser}
                        buttonText="Submit"
                        height="py-4" />
                </div>
            </div>
        </DialogModal>
    )
}