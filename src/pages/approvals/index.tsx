import { useMemo, useState } from "react";
import colors from "tailwindcss/colors";
import { PageSize } from "../../common/globals";
import { approvalRequestDataMock, mockData, productDataMock } from "../../common/mocks";
import PageHeader from "../../components/header/PageHeader";
import { ApproveIcon } from "../../components/icons/ApproveIcon";
import { DeniedIcon } from "../../components/icons/DeniedIcon";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import ApprovalRequestDetailModal from "./micro-components/ApprovalRequestDetailModal";


export default function Approvals({ }: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState(Object.assign([]));
    const [showApprovalDetail, setShowApprovalDetail] = useState(false);

    const handleViewApprovalDetails = (data: any) => {
       setShowApprovalDetail(true);
    }

    const handleDeleteUser = () => {
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
                onViewDetails={handleViewApprovalDetails}
                headerList={
                    {
                        sn: "S/N",
                        firstName: "Port Number",
                        lastName: "BIN Location",
                        username: "UOM",
                        storageLocation: "Storage Location",
                        warehouseLocation: "Warehouse Location",
                        orderId: "Order Id",
                        orderDate: "Order Date",
                        action: ""
                    }
                }
                actionButtonList={
                    [
                        {
                            handleClick: handleDeleteUser,
                            actionText: "Approve",
                            btnClassName: "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
                            hasIcon: {
                                val: true,
                                alt: 'Approve',
                                icon: <ApproveIcon fill={colors.green[900]} className="h-5 w-5" />
                            },
                        },
                        {
                            handleClick: handleViewApprovalDetails,
                            actionText: "Decline",
                            btnClassName: "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
                            hasIcon: {
                                val: true,
                                alt: 'Decline',
                                icon: <DeniedIcon fill={colors.red[900]} className="h-5 w-5" />
                            },
                        }
                    ]
                }
            />)
    }, [currentPage, mockData])
    return (
        <DashboardContainer>
            <div className='h-screen'>
                <PageHeader
                    title="Approvals"
                    description="Approve and decline requests"
                />
                {tableData}
                <div className="m-3 h-5"></div>
            </div>
            {showApprovalDetail && 
            <ApprovalRequestDetailModal
            size="md:w-3/5"
                showModal={showApprovalDetail}
                data={approvalRequestDataMock}
                onClosed={() => setShowApprovalDetail(!showApprovalDetail)}
            />}
        </DashboardContainer>
    )
}