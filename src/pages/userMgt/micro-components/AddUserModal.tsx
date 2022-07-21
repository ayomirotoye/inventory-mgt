import { useState } from "react";
import toast from "react-hot-toast";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import SearchInput from "../../../components/inputs/SearchInput";
import DialogModal from "../../../components/modals/DialogModal";
import { hasKeys, isSuccessful } from "../../../libs/helper";
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
            if (hasKeys(response)) {
                setIsUserPresent(true)
                const userDetailsUpdated = { ...userDetail, ...response };
                setUserDetail(userDetailsUpdated);
            }
        })
    }

    const handleSubmitUser = () => {
        setIsSubmitting(true);
        callPostAddUserApi(userDetail).then((response: any) => {
            console.log("response::", response);
            setIsSubmitting(false);
            if (isSuccessful(response?.responseCode)) {
                toast.custom((t) => <Alert type="success" t={t}
                    message={response?.message ?? responseMessages.SUCCESSFUL} />);
            } else {
                console.log("ttt::")
                // toast.loading('Waiting...');
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
                        value={userDetail?.givenName}
                        hideableLabelText=""
                        fixedLabelText="Firstname"
                        readOnly={true}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="givenName"
                        error={{
                            hasError: formErrors.givenName,
                            message: formErrors.givenName,
                        }}
                    />
                    <CustomInput
                        value={userDetail?.surname}
                        hideableLabelText=""
                        fixedLabelText="Lastname"
                        type="text"
                        readOnly={true}
                        inputFontSize="md:text-sm"
                        name="surname"
                        error={{
                            hasError: formErrors.surname,
                            message: formErrors.surname,
                        }}
                    />
                </div>
                <div className="mb-2 md:flex md:justify-between md:space-x-2">
                    <CustomInput
                        value={userDetail?.telephoneNumber}
                        hideableLabelText=""
                        fixedLabelText="Phone number"
                        type="text"
                        readOnly={true}
                        inputFontSize="md:text-sm"
                        name="telephoneNumber"
                        error={{
                            hasError: formErrors.telephoneNumber,
                            message: formErrors.telephoneNumber,
                        }}
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
                    <PrimaryButton
                        extraDivStyles="w-full my-5"
                        disabled={isSubmitting || !isUserPresent}
                        isLoading={isSubmitting}
                        onClicked={handleSubmitUser}
                        buttonText="Submit"
                        height="py-4" />
                </div>
            </div>
        </DialogModal>
    )
}