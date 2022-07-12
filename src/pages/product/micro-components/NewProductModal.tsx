import { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import CustomInput from "../../../components/inputs/CustomInput"
import FileInput from "../../../components/inputs/FileInput";
import DialogModal from "../../../components/modals/DialogModal"

export default function NewProductModal({
    showAddProductModal = false,
    onClosed
}: any) {

    const [formErrors, setFormErrors] = useState<any>({
    });
    const [values, setValues] = useState({
        "lastName": "",
        "firstName": "",
        "username": "",
        "userType": "",
        "assetLocation": "",
        "purpose": "",
    });
    return (
        <DialogModal
            showFooter={false}
            size="md:w-1/2"
            isModalVisible={showAddProductModal}
            modalTitle="Add New Product"
            onClosed={onClosed}
        >
            <div className="my-3">
                <div className="mb-2 md:flex md:justify-between md:space-x-2">
                    <CustomInput
                        value={values.firstName}
                        hideableLabelText=""
                        fixedLabelText="Product Name"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="firstName"
                        error={{
                            hasError: formErrors.firstName,
                            message: formErrors.firstName
                        }}
                    />
                    <CustomInput
                        value={values.lastName}
                        hideableLabelText=""
                        fixedLabelText="Product Description"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="lastName"
                        error={{
                            hasError: formErrors.lastName,
                            message: formErrors.lastName
                        }}
                    />
                </div>
                <div className="mb-2 md:flex md:justify-between md:space-x-2">
                    <CustomInput
                        value={values.username}
                        hideableLabelText=""
                        fixedLabelText="Product Unique ID"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="username"
                        error={{
                            hasError: formErrors.username,
                            message: formErrors.username
                        }}
                    />
                    <CustomInput
                        value={values.userType}
                        hideableLabelText=""
                        fixedLabelText="Category"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="userType"
                        error={{
                            hasError: formErrors.userType,
                            message: formErrors.userType
                        }}
                    />
                </div>
                <div className="mb-2 md:flex md:justify-between md:space-x-2">
                    <CustomInput
                        value={values.assetLocation}
                        hideableLabelText=""
                        fixedLabelText="Location"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="assetLocation"
                        error={{
                            hasError: formErrors.assetLocation,
                            message: formErrors.assetLocation
                        }}
                    />
                </div>
                <div className="mb-2 md:flex md:justify-between md:space-x-2">
                    <CustomInput
                        value={values.purpose}
                        hideableLabelText=""
                        fixedLabelText="Part Number"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="text"
                        inputFontSize="md:text-sm"
                        name="purpose"
                        error={{
                            hasError: formErrors.purpose,
                            message: formErrors.purpose
                        }}
                    />
                </div>
                <div className="mb-3">
                    <FileInput
                        label="Product Image"
                        onFileChange={(data: any) => {
                            setValues({
                                ...values,
                                ...data
                            })
                        }}
                        id="firstName"
                        value={values?.firstName}
                        size="md:w-full"
                        onFileChangeError={
                            (data: any) => {
                                setFormErrors({
                                    ...formErrors,
                                    ...data
                                })
                            }
                        }
                    />
                </div>
                <div>
                    <PrimaryButton
                        buttonText="Submit"
                        height="py-4"
                    />
                </div>
            </div>
        </DialogModal>
    )
}