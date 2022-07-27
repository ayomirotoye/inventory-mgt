import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PageHeader from "../../components/header/PageHeader";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import AppTable from "../../components/tables/app-table";
import DashboardContainer from "../../containers/DashboardContainer";
import { isNullOrUndefined } from "../../libs/helper";
import { callGetMenusApi } from "../../services/MenuOpsService";
import { theme } from "../../tailwind.config";
import AddMenuModal from "./micro-components/AddMenuModal";
import DeleteMenuModal from "./micro-components/DeleteMenuModal";

let PageSize = 10;

export default function MenuMgt({}: any) {
  const [showAddNewMenuModal, setShowAddNewMenuModal] = useState(false);
  const [showDeleteMenuModal, setShowDeleteMenuModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState("");
  const [tableData, setTableData] = useState(Object.assign([]));
  const [dataList, setDataList] = useState(Object.assign([]));

  const handleViewUserDetails = (e: any) => {};

  const handleDeleteMenu = (e: any) => {
    if (!isNullOrUndefined(e.target.parentElement.dataset?.itemdata)) {
      const data = JSON.parse(e.target.parentElement.dataset?.itemdata);
      setCurrentUserId(data.id);
    }
    setShowDeleteMenuModal(true);
  };

  const handleAddNewMenu = () => {
    setShowAddNewMenuModal(true);
  };

  const fetchMenus = () => {
    callGetMenusApi().then((response: any) => {
      if (Array.isArray(response)) {
        setDataList(response);
      }
    });
  };

  useEffect(() => {
    fetchMenus();

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
          id: "id",
          title: "title",
          action: "",
        }}
        actionButtonList={[
          {
            handleClick: handleDeleteMenu,
            actionText: "Delete",
            btnClassName:
              "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
            hasIcon: {
              val: true,
              alt: "Delete menu",
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
              alt: "View role details",
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
        title="Menu management"
        description="Manage menu and menu details"
      />
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Add New"
          extraDivStyles="w-full md:w-1/6 my-2"
          onClicked={handleAddNewMenu}
        />
      </div>
      {tableData}

      {showAddNewMenuModal && (
        <AddMenuModal
          isOpen={showAddNewMenuModal}
          handleClose={() => {
            setShowAddNewMenuModal(false);
          }}
          fetchMenus={fetchMenus}
        />
      )}
      {showDeleteMenuModal && (
        <DeleteMenuModal
          isOpen={showDeleteMenuModal}
          userId={currentUserId}
          handleClose={() => {
            setShowDeleteMenuModal(false);
          }}
          fetchMenus={fetchMenus}
        />
      )}
    </DashboardContainer>
  );
}
