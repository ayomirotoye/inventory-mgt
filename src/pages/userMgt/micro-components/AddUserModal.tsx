import { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import AutoComplete from "../../../components/inputs/autoComplete";
import CustomInput from "../../../components/inputs/CustomInput";
import SearchInput from "../../../components/inputs/SearchInput";
import DialogModal from "../../../components/modals/DialogModal";

export default function AddUserModal({ handleClose, isOpen }: any) {
    const [formErrors] = useState<any>({});
    const [values, setValues] = useState({
        lastName: "",
        firstName: "",
        username: "",
        userType: "",
        assetLocation: "",
        purpose: "",
    });
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
                        <AutoComplete
                            suggestions={["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii"]}
                            widthClass="w-full border-2 border-primary-900 rounded-md my-2"
                        />
                    </div>
                    <div className="w-1/2">
                        <CustomInput
                            value={values.userType}
                            hideableLabelText=""
                            fixedLabelText="User Type"
                            onChange={(e: any) => {
                                setValues({ ...values, [e.target.name]: e.target.value });
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
                        value={values.firstName}
                        hideableLabelText=""
                        fixedLabelText="Firstname"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value });
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
                        value={values.lastName}
                        hideableLabelText=""
                        fixedLabelText="Lastname"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value });
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
                        value={values.assetLocation}
                        hideableLabelText=""
                        fixedLabelText="Asset location"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value });
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
                        value={values.purpose}
                        hideableLabelText=""
                        fixedLabelText="Purpose"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value });
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