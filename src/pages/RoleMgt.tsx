import { useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";

export default function RoleMgt({ }: any) {
    const [showAddNewRoleModal, setShowAddNewRoleModal] = useState(false);
    const [formErrors] = useState<any>({

    });
    const [values, setValues] = useState({
        "roleTitle": "",
        "description": "",
    });

    const handleAddNewRole = () => {
        setShowAddNewRoleModal(true);
    }

    const handleViewRoleDetails = () => {
    }

    const handleDeleteRole = () => {
    }
    
    const handleCloseAddNewRoleModal = () => {
        setShowAddNewRoleModal(false);
    }

    return (
        <DashboardContainer>
            <PageHeader
                title="Role management"
                description="Manage user roles"
            />
            <div className="flex justify-end">
                <PrimaryButton
                    buttonText="Add New"
                    extraDivStyles="w-full md:w-1/6 my-2"
                    onClicked={handleAddNewRole}

                />
            </div>
            <AppTable
                dataList={[
                    {
                        id: "1",
                        roleTitle: "USER",
                    },
                    {
                        id: "2",
                        roleTitle: "ADMIN",
                    }
                ]}
                headerList={
                    {
                        id: "S/N",
                        roleTitle: "Role Title",
                        action: ""
                    }
                }
                actionButtonList={
                    [
                        {
                            handleClick: handleDeleteRole,
                            actionText: "Delete",
                            btnClassName: "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline"
                        },
                        {
                            handleClick: handleViewRoleDetails,
                            actionText: "View",
                            btnClassName: "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline"
                        }
                    ]
                }
            />

            {showAddNewRoleModal && <DialogModal
                showFooter={false}
                size="md:w-1/2"
                isModalVisible={showAddNewRoleModal}
                modalTitle="New role details"
                onClosed={handleCloseAddNewRoleModal}
            >
                <div className="my-3">
                    <div className="mb-2 md:flex md:justify-between md:space-x-2">
                        <CustomInput
                            value={values.roleTitle}
                            hideableLabelText=""
                            fixedLabelText="Title"
                            onChange={(e: any) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }}
                            type="text"
                            inputFontSize="md:text-sm"
                            name="roleTitle"
                            error={{
                                hasError: formErrors.roleTitle,
                                message: formErrors.roleTitle
                            }}
                        />
                        <CustomInput
                            value={values.description}
                            hideableLabelText=""
                            fixedLabelText="Description"
                            onChange={(e: any) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }}
                            type="text"
                            inputFontSize="md:text-sm"
                            name="description"
                            error={{
                                hasError: formErrors.description,
                                message: formErrors.description
                            }}
                        />
                    </div>

                    <div>
                        <PrimaryButton
                            buttonText="Submit"
                            height="py-4"
                        />
                    </div>
                </div>
            </DialogModal>}
        </DashboardContainer>
    )
}