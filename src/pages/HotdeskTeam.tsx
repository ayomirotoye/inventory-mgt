import { useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import CustomInput from "../components/inputs/CustomInput";
import DialogModal from "../components/modals/DialogModal";
import AppTable from "../components/tables/app-table";
import DashboardContainer from "../containers/DashboardContainer";

export default function HotdeskTeam({}: any) {
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false);
  const [formErrors] = useState<any>({});
  const [values, setValues] = useState({
    productName: "",
    productDescription: "",
    productUniqueId: "",
    category: "",
    assetLocation: "",
    partNumber: "",
    wareHouseLocation: "",
    binLocation: "",
    productImage: "",
    quantity: "",
    inventoryType: "",
    cost: "",
    expiryDate: "",
  });

  const handleViewProductDetails = () => {};

  const handleDeleteProduct = () => {};

  const handleAddNewProduct = () => {
    setShowAddNewProductModal(true);
  };
  const handleCloseAddNewProductModal = () => {
    setShowAddNewProductModal(false);
  };

  return (
    <DashboardContainer>
      <PageHeader
        title="HotdeskTeam (Product Management)"
        description="Manage product and product details"
      />
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Add New"
          extraDivStyles="w-full md:w-1/6 my-2"
          onClicked={handleAddNewProduct}
        />
      </div>
      <AppTable
        dataList={[
          {
            id: "1",
            ProductName: "Segun",
            productUniqueId: "segundeyemi",
            category: "Asset category",
            assetLocation: "Asset category",
            wareHouseLocation: "Asset category",
            quantity: "Asset category",
            cost: "Asset category",
            expiryDate: "Asset category",
            action: "",
          },
        ]}
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
            handleClick: handleDeleteProduct,
            actionText: "Delete",
            btnClassName:
              "cursor-pointer bg-gray-300 text-red-900 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline",
          },
          {
            handleClick: handleViewProductDetails,
            actionText: "View",
            btnClassName:
              "cursor-pointer text-primary-900 rounded-lg border-2 border-primary-900 py-3 px-5 font-bold focus:shadow-outline",
          },
        ]}
      />

      {showAddNewProductModal && (
        <DialogModal
          showFooter={false}
          size="md:w-1/2"
          isModalVisible={showAddNewProductModal}
          modalTitle="Add New Product"
          onClosed={handleCloseAddNewProductModal}
        >
          <div className="my-3">
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.productName}
                hideableLabelText=""
                fixedLabelText="Product Name"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="productName"
                error={{
                  hasError: formErrors.productName,
                  message: formErrors.productName,
                }}
              />
              <CustomInput
                value={values.productDescription}
                hideableLabelText=""
                fixedLabelText="product Description"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="productDescription"
                error={{
                  hasError: formErrors.productDescription,
                  message: formErrors.productDescription,
                }}
              />
            </div>
            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.productUniqueId}
                hideableLabelText=""
                fixedLabelText="Product UniqueId"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="productUniqueId"
                error={{
                  hasError: formErrors.productUniqueId,
                  message: formErrors.productUniqueId,
                }}
              />
              <CustomInput
                value={values.category}
                hideableLabelText=""
                fixedLabelText="Category"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="category"
                error={{
                  hasError: formErrors.category,
                  message: formErrors.category,
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

              <CustomInput
                value={values.partNumber}
                hideableLabelText=""
                fixedLabelText="Part Number"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="partNumber"
                error={{
                  hasError: formErrors.partNumber,
                  message: formErrors.purpartNumberpose,
                }}
              />
            </div>

            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.wareHouseLocation}
                hideableLabelText=""
                fixedLabelText="WareHouse Location"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="wareHouseLocation"
                error={{
                  hasError: formErrors.wareHouseLocation,
                  message: formErrors.wareHouseLocation,
                }}
              />

              <CustomInput
                value={values.binLocation}
                hideableLabelText=""
                fixedLabelText="Bin Location"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="binLocation"
                error={{
                  hasError: formErrors.binLocation,
                  message: formErrors.binLocation,
                }}
              />
            </div>

            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.productImage}
                hideableLabelText=""
                fixedLabelText="Product Image"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="productImage"
                error={{
                  hasError: formErrors.productImage,
                  message: formErrors.productImage,
                }}
              />
              <CustomInput
                value={values.quantity}
                hideableLabelText=""
                fixedLabelText="Product Image"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="quantity"
                error={{
                  hasError: formErrors.quantity,
                  message: formErrors.quantity,
                }}
              />
            </div>

            <div className="mb-2 md:flex md:justify-between md:space-x-2">
              <CustomInput
                value={values.cost}
                hideableLabelText=""
                fixedLabelText="Cost"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="cost"
                error={{
                  hasError: formErrors.cost,
                  message: formErrors.cost,
                }}
              />
              <CustomInput
                value={values.expiryDate}
                hideableLabelText=""
                fixedLabelText="Expiry Date"
                onChange={(e: any) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                type="text"
                inputFontSize="md:text-sm"
                name="expiryDate"
                error={{
                  hasError: formErrors.expiryDate,
                  message: formErrors.expiryDate,
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
