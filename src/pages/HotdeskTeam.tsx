import { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import colors from "tailwindcss/colors";
import { mockDataProduct } from "../common/mocks";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";
import { theme } from "../tailwind.config";
import NewProductModal from "../pages/product/micro-components/NewProductModal";
import ProductSection from "../pages/product/micro-components/ProductSection";

let PageSize = 10;

export default function UserMgt({}: any) {
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);

  const addNewProduct = () => {
    setShowAddNewProduct(true);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(Object.assign([]));

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

  const handleCloseAddNewUserModal = () => {
    setShowAddNewProduct(false);
  };

  useMemo(() => {
    console.log("currentPage:::", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let dataList = mockDataProduct?.slice(firstPageIndex, lastPageIndex);

    setTableData(
      <AppTable
        dataList={dataList}
        currentPage={currentPage}
        totalCount={mockDataProduct.length}
        PageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        headerList={{
          id: "S/N",
          ProductName: "Product Name",
          productUniqueId: "Product Unique Id",
          category: "Category",
          assetLocation: "Asset Location",
          wareHouseLocation: "WareHouse Location",
          quantity: "Quantity",
          cost: "Cost",
          expiryDate: "Expiry Date",
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
        ]}
      />
    );
  }, [currentPage, mockDataProduct]);

  return (
    <DashboardContainer>
      <PageHeader
        title="Product management"
        description="Manage product and product details"
        addNew={
          <PrimaryButton
            onClicked={addNewProduct}
            height="py-2 px-3 mb-2 md:mb-0"
            className="w-full font-bold bg-white text-black rounded-lg border-2 border-red-900 cursor-pointer"
          >
            <span className="flex justify-between inline-block align-middle items-center">
              <AiOutlinePlus
                fill={colors.yellow[400]}
                strokeWidth={10}
                className="h-5 w-5"
              />
              Add New Product
            </span>
          </PrimaryButton>
        }
      />

      {tableData}

      {showAddNewProduct && (
        <NewProductModal
          showAddProductModal={showAddNewProduct}
          onClosed={() => setShowAddNewProduct(false)}
        />
      )}
    </DashboardContainer>
  );
}
