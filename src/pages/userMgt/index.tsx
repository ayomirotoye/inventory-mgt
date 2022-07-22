import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PageHeader from "../../components/header/PageHeader";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import { isNullOrUndefined } from "../../libs/helper";
import { callGetUsersApi } from "../../services/userOpsService";
import { theme } from "../../tailwind.config";
import ActivateUserModal from "./micro-components/ActivateUserModal";
import AddUserModal from "./micro-components/AddUserModal";
import DeactivateUserModal from "./micro-components/DeactivateUserModal";
import DeleteUserModal from "./micro-components/DeleteUserModal";

let PageSize = 10;

export default function UserMgt({ }: any) {
    const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showActivateUserModal, setShowActivateUserModal] = useState(false);
    const [showDeactivateUserModal, setShowDeactivateUserModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUserId, setCurrentUserId] = useState("");
    const [tableData, setTableData] = useState(Object.assign([]));
    const [dataList, setDataList] = useState(Object.assign([]));

    const handleViewUserDetails = () => { };

    const canActivate = (userStatus: string) => {
        return userStatus !== "active";
    }

    const canDeactivate = (userStatus: string) => {
        return userStatus === "active";
    }

    const handleDeleteUser = (e: any) => {
        if (!isNullOrUndefined(e.target.parentElement.dataset?.itemdata)) {
            const data = JSON.parse(e.target.parentElement.dataset?.itemdata);
            setCurrentUserId(data.id);
        }
        setShowDeleteUserModal(true)
    };

    const handleDeactivateUser = () => { };

    const handleAactivateUser = () => { };

    const handleAddNewUser = () => {
        setShowAddNewUserModal(true);
    };

    const fetchUsers = () => {
        callGetUsersApi().then((response: any) => {
            if (Array.isArray(response)) {
                setDataList(response);
            }
        })
    }

    useEffect(() => {
        fetchUsers();

        return () => {
            setDataList([]);
        }
    }, [])


    useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        let dataListP = dataList?.slice(firstPageIndex, lastPageIndex);

        setTableData(
            <AppTable
                dataList={dataListP}
                currentPage={currentPage}
                totalCount={dataList.length}
                PageSize={PageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
                headerList={{
                    sn: "S/N",
                    firstName: "Firstname",
                    lastName: "Lastname",
                    userName: "Username",
                    officePhoneNumber: "Phone number",
                    location: "Location",
                    status: "User Status",
                    action: "",
                }}
                actionButtonList={[
                    {
                        handleClick: handleDeleteUser,
                        actionText: "Delete",
                        btnClassName:
                            "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
                        hasIcon: {
                            val: true,
                            alt: "Delete user",
                            icon: (
                                <DeleteIcon
                                    fill={theme.extend.colors.red[650]}
                                    className="h-5 w-5"
                                />
                            ),
                        },
                    },
                    {
                        handleClick: handleViewUserDetails,
                        actionText: "View",
                        btnClassName:
                            "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
                        hasIcon: {
                            val: true,
                            alt: "View user details",
                            icon: (
                                <EyeIcon
                                    fill={theme.extend.colors.primary[900]}
                                    className="h-5 w-5"
                                />
                            ),
                        },
                    },
                    {
                        handleClick: handleAactivateUser,
                        actionText: "Activate",
                        isVisible: canDeactivate,
                        visibilityConditionField: "status",
                        btnClassName:
                            "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
                        hasIcon: {
                            val: true,
                            alt: "Disable user",
                            icon: (
                                <EyeIcon
                                    fill={theme.extend.colors.red[650]}
                                    className="h-5 w-5"
                                />
                            ),
                        },
                    },
                    {
                        handleClick: handleDeactivateUser,
                        actionText: "Deactivate",
                        isVisible: canActivate,
                        visibilityConditionField: "status",
                        btnClassName:
                            "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
                        hasIcon: {
                            val: true,
                            alt: "Disable user",
                            icon: (
                                <EyeIcon
                                    fill={theme.extend.colors.red[650]}
                                    className="h-5 w-5"
                                />
                            ),
                        },
                    },
                ]}
            />
        );
    }, [currentPage, dataList]);

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

            {showAddNewUserModal && (
                <AddUserModal
                    isOpen={showAddNewUserModal}
                    handleClose={() => { setShowAddNewUserModal(false) }}
                    fetchUsers={fetchUsers}
                />
            )}
            {showDeleteUserModal && (
                <DeleteUserModal
                    isOpen={showDeleteUserModal}
                    userId={currentUserId}
                    handleClose={() => { setShowDeleteUserModal(false) }}
                    fetchUsers={fetchUsers}
                />
            )}
            {showActivateUserModal && (
                <ActivateUserModal
                    isOpen={showActivateUserModal}
                    userId={currentUserId}
                    handleClose={() => { setShowActivateUserModal(false) }}
                    fetchUsers={fetchUsers}
                />
            )}

            {showDeactivateUserModal && (
                <DeactivateUserModal
                    isOpen={showDeactivateUserModal}
                    userId={currentUserId}
                    handleClose={() => { setShowDeactivateUserModal(false) }}
                    fetchUsers={fetchUsers}
                />
            )}
        </DashboardContainer>
    );
}
