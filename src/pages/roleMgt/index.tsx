import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PageHeader from "../../components/header/PageHeader";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import { isNullOrUndefined } from "../../libs/helper";
import { callGetRolesApi } from "../../services/roleOpsService";
import { theme } from "../../tailwind.config";
import AddRoleModal from "./micro-components/AddRoleModal";
import DeleteRoleModal from "./micro-components/DeleteRoleModal";
import EditRoleModal from "./micro-components/EditRoleModal";
import ViewRoleDetailsModal from "./micro-components/ViewRoleDetailsModal";

let PageSize = 10;

export default function UserMgt({ }: any) {
  const [showAddNewRoleModal, setShowAddNewRoleModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [showViewRoleModal, setShowViewRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRole, setCurrentRole] = useState(Object.assign({}));
  const [tableData, setTableData] = useState(Object.assign([]));
  const [dataList, setDataList] = useState(Object.assign([]));

  const handleViewRoleDetails = (e: any) => {
    if (!isNullOrUndefined(e.target.parentElement.dataset?.itemdata)) {
      const data = JSON.parse(e.target.parentElement.dataset?.itemdata);
      setCurrentRole(data);
    }
    setShowViewRoleModal(true);
  };

  const handleDeleteRole = (e: any) => {
    if (!isNullOrUndefined(e.target.parentElement.dataset?.itemdata)) {
      const data = JSON.parse(e.target.parentElement.dataset?.itemdata);
      setCurrentRole(data);
    }
    setShowDeleteRoleModal(true);
  };

  const handleAddNewRole = () => {
    setShowAddNewRoleModal(true);
  };

  const fetchRoles = () => {
    callGetRolesApi().then((response: any) => {
      if (Array.isArray(response)) {
        setDataList(response);
      }
    });
  };

  useEffect(() => {
    fetchRoles();

    return () => {
      setDataList([]);
    };
  }, []);

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
          id: "Id",
          name: "name",

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
              alt: "Delete role",
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
              alt: "View Role Details",
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
  }, [currentPage, dataList]);

  return (
    <DashboardContainer>
      <PageHeader
        title="Role Management"
        description="Manage Roles and Role details"
      />
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Add Role"
          extraDivStyles="w-full md:w-1/6 my-2"
          onClicked={handleAddNewRole}
        />
      </div>
      {tableData}

      {showAddNewRoleModal && (
        <AddRoleModal
          isOpen={showAddNewRoleModal}
          handleClose={() => {
            setShowAddNewRoleModal(false);
          }}
          fetchRoles={fetchRoles}
        />
      )}
      {showDeleteRoleModal && (
        <DeleteRoleModal
          isOpen={showDeleteRoleModal}
          roleId={currentRole.id}
          handleClose={() => {
            setShowDeleteRoleModal(false);
          }}
          fetchRoles={fetchRoles}
        />
      )}
      {showViewRoleModal && (
        <ViewRoleDetailsModal
          isOpen={showViewRoleModal}
          data={currentRole}
          handleEditRoleDetails={() => {
            setShowViewRoleModal(false)
            setShowEditRoleModal(true)
          }}
          handleClose={() => {
            setShowViewRoleModal(false);
          }}
        />
      )}
       {showEditRoleModal && (
        <EditRoleModal
          isOpen={showEditRoleModal}
          data={currentRole}
          handleClose={() => {
            setShowEditRoleModal(false);
          }}
        />
      )}
    </DashboardContainer>
  );
}
