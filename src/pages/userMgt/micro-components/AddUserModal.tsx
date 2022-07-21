import { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import SearchInput from "../../../components/inputs/SearchInput";
import DialogModal from "../../../components/modals/DialogModal";
import { hasKeys } from "../../../libs/helper";
import { callGetUserByUsernameApi } from "../../../services/userOpsService";

export default function AddUserModal({ handleClose, isOpen }: any) {
    const [formErrors] = useState<any>({});
    const [userDetail, setUserDetail] = useState<any>({
        "description":"",
        "displayName":"",
        "distinguishedName":"",
        "emailAddress":"",
        "name":"",
        "employeeId": null,
        "givenName":"",
        "middleName": null,
        "title":"",
        "surname":"",
        "samAccountName":"",
        "photoData": null,
        "ou":"",
        "location":"",
        "company":"",
        "businessCategory":"",
        "physicalDeliveryOfficeName":"",
        "telephoneNumber":"",
        "whenCreated":"",
        "whenChanged":"",
        "mail":"",
        "employmentType":"",
        "manager":"",
        "managerCN":"",
        "shellGGDDepartmentNumber":"",
    });

    const onClick = () => {
        callGetUserByUsernameApi(userDetail.username).then((response: any) => {
            console.log("response::", response)
            if (hasKeys(response)) {
                setUserDetail({...userDetail, ...response});
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
            <div className="mb-2 md:flex md:space-x-2">
                <div className="w-full">
                    <span>Username</span>
                    <SearchInput
                        searchQuery={userDetail.username}
                        onChangeInput={(value: any) => {
                            setUserDetail({ ...userDetail, username: value });
                        }}
                        handleClick={onClick}
                        widthClass="w-full border-2 border-primary-900 rounded-md my-2"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <CustomInput
                        value={userDetail.userType}
                        hideableLabelText=""
                        fixedLabelText="User Type"
                        onChange={(e: any) => {
                            setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="userType"
                        error={{
                            hasError: formErrors.userType,
                            message: formErrors.userType,
                        }}
                    />
                </div>
            </div>
            <div className="mb-2 md:flex md:justify-between md:space-x-2">

                <CustomInput
                    value={userDetail.firstName}
                    hideableLabelText=""
                    fixedLabelText="Firstname"
                    onChange={(e: any) => {
                        setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                    }}
                    type="text"
                    inputFontSize="md:text-sm"
                    name="firstName"
                    error={{
                        hasError: formErrors.firstName,
                        message: formErrors.firstName,
                    }}
                />
                <CustomInput
                    value={userDetail.lastName}
                    hideableLabelText=""
                    fixedLabelText="Lastname"
                    onChange={(e: any) => {
                        setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                    }}
                    type="text"
                    inputFontSize="md:text-sm"
                    name="lastName"
                    error={{
                        hasError: formErrors.lastName,
                        message: formErrors.lastName,
                    }}
                />
            </div>
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
                <CustomInput
                    value={userDetail.assetLocation}
                    hideableLabelText=""
                    fixedLabelText="Asset location"
                    onChange={(e: any) => {
                        setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                    }}
                    type="text"
                    inputFontSize="md:text-sm"
                    name="assetLocation"
                    error={{
                        hasError: formErrors.assetLocation,
                        message: formErrors.assetLocation,
                    }}
                />
            </div>
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
                <CustomInput
                    value={userDetail.purpose}
                    hideableLabelText=""
                    fixedLabelText="Purpose"
                    onChange={(e: any) => {
                        setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
                    }}
                    type="text"
                    inputFontSize="md:text-sm"
                    name="purpose"
                    error={{
                        hasError: formErrors.purpose,
                        message: formErrors.purpose,
                    }}
                />
            </div>
            <div>
                <PrimaryButton buttonText="Submit" height="py-4" />
            </div>
        </div>
    </DialogModal>
)
}