import { useMemo, useState } from "react";
import colors from "tailwindcss/colors";
import { PageSize } from "../common/globals";
import { mockData } from "../common/mocks";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";

export default function UserMgt({ }: any) {
    const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState(Object.assign([]));

    const [formErrors] = useState<any>({

    });
    const [values, setValues] = useState({
        "lastName": "",
        "firstName": "",
        "username": "",
        "userType": "",
        "assetLocation": "",
        "purpose": "",
    });

    const handleViewUserDetails = () => {
    }

    const handleDeleteUser = () => {
    }

    const handleAddNewUser = () => {
        setShowAddNewUserModal(true);
    }
    const handleCloseAddNewUserModal = () => {
        setShowAddNewUserModal(false);
    }

    useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        let dataList = mockData?.slice(firstPageIndex, lastPageIndex);

        setTableData(
            <AppTable
                dataList={dataList}
                currentPage={currentPage}
                totalCount={mockData.length}
                PageSize={PageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
                headerList={
                    {
                        sn: "S/N",
                        firstName: "Firstname",
                        lastName: "Lastname",
                        username: "Username",
                        assetCategory: "Asset category",
                        action: ""
                    }
                }
                actionButtonList={
                    [
                        {
                            handleClick: handleDeleteUser,
                            actionText: "Delete",
                            btnClassName: "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
                            hasIcon: {
                                val: true,
                                alt: 'Delete user',
                                icon:<DeleteIcon fill={(colors as any).red[650]} className="h-5 w-5"/>
                            },
                        },
                        {
                            handleClick: handleViewUserDetails,
                            actionText: "View",
                            btnClassName: "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
                            hasIcon: {
                                val: true,
                                alt: 'View user details',
                                icon:<EyeIcon fill={(colors as any).red[900]} className="h-5 w-5"/>
                            },
                        }
                    ]
                }
            />)
    }, [currentPage, mockData])

    return (
        <DashboardContainer>
            <PageHeader
                title="User management"
                description="Manage users and user details"
            />
            <div className="flex justify-end">
                <PrimaryButton
                    buttonText="Add New"
                    extraDivStyles="w-full md:w-1/6 my-2"
                    onClicked={handleAddNewUser}

                />
            </div>

            {tableData}

            {showAddNewUserModal && <DialogModal
                showFooter={false}
                size="md:w-1/2"
                isModalVisible={showAddNewUserModal}
                modalTitle="New user details"
                onClosed={handleCloseAddNewUserModal}
            >
                <div className="my-3">
                    <div className="mb-2 md:flex md:justify-between md:space-x-2">
                        <CustomInput
                            value={values.firstName}
                            hideableLabelText=""
                            fixedLabelText="Firstname"
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
                            fixedLabelText="Lastname"
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
                            fixedLabelText="Username"
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
                            fixedLabelText="Usertype"
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
                            fixedLabelText="Asset location"
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
                            fixedLabelText="Purpose"
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