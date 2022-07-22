import { useEffect, useMemo, useState } from "react";
import { mockData } from "../../common/mocks";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PageHeader from "../../components/header/PageHeader";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import { isSuccessful } from "../../libs/helper";
import { callDeleteUsersApi, callGetUsersApi } from "../../services/userOpsService";
import { theme } from "../../tailwind.config";
import AddUserModal from "./micro-components/AddUserModal";

let PageSize = 10;

export default function UserMgt({ }: any) {
    const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState(Object.assign([]));
    const [dataList, setDataList] = useState(Object.assign([]));

    const handleViewUserDetails = () => { };

    const handleDeleteUser = () => {
        callDeleteUsersApi("").then((response: any) => {
            console.log("log:::", response);
            if (Array.isArray(response)) {
                setDataList(response);
            }
        })
    };

    const handlDeactivateUser = () => { };

    const handleAddNewUser = () => {
        setShowAddNewUserModal(true);
    };

    useEffect(() => {
        callGetUsersApi().then((response: any) => {
            console.log("log:::", response);
            if (Array.isArray(response)) {
                setDataList(response);
            }
        })

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
                        handleClick: handlDeactivateUser,
                        actionText: "Activate/Deactivate",
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
                />
            )}
        </DashboardContainer>
    );
}
