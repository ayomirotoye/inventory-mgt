import { useMemo, useState } from "react";
import colors from "tailwindcss/colors";
import { PageSize } from "../../common/globals";
import { approvalRequestDataMock, ApprovalMockData } from "../../common/mocks";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PageHeader from "../../components/header/PageHeader";
import { ApproveIcon } from "../../components/icons/ApproveIcon";
import { DeniedIcon } from "../../components/icons/DeniedIcon";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import DialogModal from "../../components/modals/DialogModal";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import ApprovalRequestDetailModal from "./micro-components/ApprovalRequestDetailModal";

export default function PendingApprovals({}: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(Object.assign([]));
  const [showApprovalDetail, setShowApprovalDetail] = useState(false);
  const [showAllRequestDetail, setShowAllRequestDetail] = useState(false);
  const [confirmBulkAction, setConfirmBulkAction] = useState(false);

  const handleViewApprovalDetails = (data: any) => {
    setShowApprovalDetail(true);
  };

  const handleDeclineRequest = () => {};

  const toggleAll = (isOn: boolean) => {
    setShowAllRequestDetail(isOn);
  };

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let dataList = ApprovalMockData?.slice(firstPageIndex, lastPageIndex);

    setTableData(
      <AppTable
        dataList={dataList}
        currentPage={currentPage}
        totalCount={ApprovalMockData.length}
        PageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        onViewDetails={handleViewApprovalDetails}
        handleAll={toggleAll}
        headerList={{
          sn: "S/N",
          productUniqueNumber: "Product Unique Number",
          binLocation: "BIN Location",
          Uom: "UOM",
          storageLocation: "Storage Location",
          warehouseLocation: "Warehouse Location",
          orderId: "Order Id",
          orderDate: "Order Date",
          action: "",
        }}
        actionButtonList={[
          {
            handleClick: handleViewApprovalDetails,
            actionText: "Approve",
            btnClassName:
              "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
            hasIcon: {
              val: true,
              alt: "Approve",
              icon: (
                <ApproveIcon fill={colors.green[900]} className="h-5 w-5" />
              ),
            },
          },
          {
            handleClick: handleViewApprovalDetails,
            actionText: "Decline",
            btnClassName:
              "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
            hasIcon: {
              val: true,
              alt: "Decline",
              icon: <DeniedIcon fill={colors.red[900]} className="h-5 w-5" />,
            },
          },
        ]}
      />
    );
  }, [currentPage, ApprovalMockData]);
  return (
    <DashboardContainer>
      <div className="">
        <PageHeader
          title="Approvals"
          description="Approve and decline requests"
        />
        {showAllRequestDetail && (
          <div className="w-full flex justify-end ">
            <div className="grid grid-cols-2 space-x-2 my-2">
              <div>
                <PrimaryButton
                  onClicked={() => setConfirmBulkAction(true)}
                  height="py-2 px-3 mb-2 md:mb-0"
                  className="w-full font-bold bg-white text-black rounded-lg border-2 border-red-900 cursor-pointer"
                >
                  <span className="flex justify-between inline-block align-middle items-center">
                    <DeniedIcon fill={colors.red[900]} className="h-5 w-5" />
                    Reject All
                  </span>
                </PrimaryButton>
              </div>
              <div>
                <PrimaryButton
                  onClicked={() => setConfirmBulkAction(true)}
                  height="py-2 px-3 mb-2 md:mb-0"
                  className="w-full font-bold bg-primary-400 text-black rounded-lg border-2 border-red-900 cursor-pointer"
                >
                  <span className="flex justify-between inline-block align-middle items-center">
                    <ApproveIcon fill={colors.green[900]} className="h-4 w-4" />
                    Approve All
                  </span>
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
        {tableData}
      </div>
      {showApprovalDetail && (
        <ApprovalRequestDetailModal
          size="md:w-3/5"
          showModal={showApprovalDetail}
          data={approvalRequestDataMock}
          onClosed={() => setShowApprovalDetail(!showApprovalDetail)}
        />
      )}

      {confirmBulkAction && (
        <ConfirmationModal
          modalTitle="Are you sure ?"
          onClosed={() => setConfirmBulkAction(!confirmBulkAction)}
          showModal={confirmBulkAction}
        />
      )}
    </DashboardContainer>
  );
}
