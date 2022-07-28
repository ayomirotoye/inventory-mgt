import { useMemo, useState } from "react";
import { mockDataMgt } from "../common/mocks";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AssetNameDropdown from "../components/dropdowns/AssetNameDropdown";
import PageHeader from "../components/header/PageHeader";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";
import {
  setValue
} from "../libs/helper";
import { theme } from "../tailwind.config";

let PageSize = 10;

export default function DataMgt() {
  const [showAddNewRoleModal, setShowAddNewRoleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(Object.assign([]));
  const [formErrors] = useState<any>({});
  const [values, setValues] = useState({
    assetName: "",
    assetAddress: "",
  });

  const handleAddNewRole = () => {
    setShowAddNewRoleModal(true);
  };

  const handleViewRoleDetails = () => { };

  const handleDeleteRole = () => { };

  const handleCloseAddNewRoleModal = () => {
    setShowAddNewRoleModal(false);
  };

  const [AssetData, setAssetData] = useState({
    requestType: {
      label: "",
      value: "",
    },
  });

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let dataList = mockDataMgt?.slice(firstPageIndex, lastPageIndex);

    setTableData(
      <AppTable
        dataList={dataList}
        currentPage={currentPage}
        totalCount={mockDataMgt.length}
        PageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        headerList={{
          id: "S/N",
          assetName: "Asset name",
          assetAddress: "Asset Address",
          action: "",
        }}
        actionButtonList={[
          {
            handleClick: handleDeleteRole,
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
            handleClick: handleViewRoleDetails,
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
        ]}
      />
    );
  }, [currentPage]);

  return (
    <DashboardContainer>
      <PageHeader
        title="Data management"
        description="Manage users asset location and details"
      />
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Add New"
          extraDivStyles="w-full md:w-1/6 my-2"
          onClicked={handleAddNewRole}
        />
      </div>

      {tableData}

      {showAddNewRoleModal && (
        <DialogModal
          showFooter={false}
          size="md:w-1/2"
          isModalVisible={showAddNewRoleModal}
          modalTitle="New Asset details"
          onClosed={handleCloseAddNewRoleModal}
        >
          <div className="my-3">
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.assetName}
                hideableLabelText=""
                fixedLabelText="Asset Name"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="assetName"
                error={{
                  hasError: formErrors.assetName,
                  message: formErrors.assetName,
                }}
              />
              <CustomInput
                value={values.assetAddress}
                hideableLabelText=""
                fixedLabelText="Asset Address"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="assetAddress"
                error={{
                  hasError: formErrors.assetAddress,
                  message: formErrors.assetAddress,
                }}
              />
            </div>
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <AssetNameDropdown
                optionTitle="Asset Location"
                labelTitle="Asset Location"
                isVisible={true}
                value={setValue(AssetData.requestType, "requestType")}
                labelClassName="flex justify-start mb-3 text-md mt-2 font-bold"
                onChange={(label: any, value: any) =>
                  setAssetData({
                    ...AssetData,
                    requestType: {
                      label: label,
                      value: value,
                    },
                  })
                }
              />
            </div>
            <div>
              <PrimaryButton buttonText="Submit" height="py-4" />
            </div>
          </div>
        </DialogModal>
      )}
    </DashboardContainer>
  );
}
