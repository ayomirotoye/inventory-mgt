import { useMemo, useState } from "react";
import { mockDataRole } from "../common/mocks";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { theme } from "../tailwind.config";

let PageSize = 10;

export default function RoleMgt({}: any) {
  const [showAddNewRoleModal, setShowAddNewRoleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(Object.assign([]));
  const [formErrors] = useState<any>({});
  const [values, setValues] = useState({
    roleTitle: "",
    description: "",
  });

  const handleAddNewRole = () => {
    setShowAddNewRoleModal(true);
  };

  const handleViewRoleDetails = () => {};

  const handleDeleteRole = () => {};

  const handleCloseAddNewRoleModal = () => {
    setShowAddNewRoleModal(false);
  };

  useMemo(() => {
    console.log("currentPage:::", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let dataList = mockDataRole?.slice(firstPageIndex, lastPageIndex);

    setTableData(
      <AppTable
        dataList={dataList}
        currentPage={currentPage}
        totalCount={mockDataRole.length}
        PageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        headerList={{
          id: "S/N",
          roleTitle: "Role Title",
          roleDescription: "Role Description",
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
  }, [currentPage, mockDataRole]);

  return (
    <DashboardContainer>
      <PageHeader title="Role management" description="Manage user roles" />
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
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="roleTitle"
                error={{
                  hasError: formErrors.roleTitle,
                  message: formErrors.roleTitle,
                }}
              />
              <CustomInput
                value={values.description}
                hideableLabelText=""
                fixedLabelText="Description"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="description"
                error={{
                  hasError: formErrors.description,
                  message: formErrors.description,
                }}
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
