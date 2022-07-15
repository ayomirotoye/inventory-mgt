import { useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";
import SearchInput from "../components/inputs/SearchInput";

export default function UpdateApprovalRoute({}: any) {
  const [showApprovalRouteModal, setShowApprovalRouteModal] = useState(false);
  const [formErrors] = useState<any>({});
  const [values, setValues] = useState({
    lastName: "",
    firstName: "",
    username: "",
    userType: "",
    assetLocation: "",
    purpose: "",
  });

  const handleViewUserDetails = () => {};

  const handleDeleteUser = () => {};

  const handleApprovalRoute = () => {
    setShowApprovalRouteModal(true);
  };
  const handleCloseAddNewUserModal = () => {
    setShowApprovalRouteModal(false);
  };

  return (
    <DashboardContainer>
      <PageHeader
        title="Update Approval Route"
        description="Manage Approval routes"
      />
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Add New"
          extraDivStyles="w-full md:w-1/6 my-2"
          onClicked={handleApprovalRoute}
        />
      </div>
      <AppTable
        dataList={[
          {
            id: "1",
            firstName: "Segun",
            lastName: "Adeyemi",
            username: "segundeyemi",
            assetCategory: "Asset category",
            action: "",
          },
        ]}
        headerList={{
          id: "S/N",
          firstName: "Firstname",
          lastName: "Lastname",
          username: "Username",
          assetCategory: "Asset category",
          action: "",
        }}
        actionButtonList={[
          {
            handleClick: handleDeleteUser,
            actionText: "Delete",
            btnClassName:
              "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
          },
          {
            handleClick: handleViewUserDetails,
            actionText: "View",
            btnClassName:
              "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
          },
        ]}
      />

      {showApprovalRouteModal && (
        <DialogModal
          showFooter={false}
          size="md:w-1/2"
          isModalVisible={showApprovalRouteModal}
          modalTitle="Update Approval Route"
          onClosed={handleCloseAddNewUserModal}
        >
          <div className="my-3">
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
              <SearchInput widthClass="md:w-3/4" />
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
                value={values.username}
                hideableLabelText=""
                fixedLabelText="Username"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="username"
                error={{
                  hasError: formErrors.username,
                  message: formErrors.username,
                }}
              />
              <CustomInput
                value={values.userType}
                hideableLabelText=""
                fixedLabelText="Usertype"
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
      )}
    </DashboardContainer>
  );
}
