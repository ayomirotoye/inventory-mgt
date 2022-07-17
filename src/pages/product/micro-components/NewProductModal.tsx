import { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import FileInput from "../../../components/inputs/FileInput";
import DialogModal from "../../../components/modals/DialogModal";

export default function NewProductModal({
  showAddProductModal = false,
  onClosed,
}: any) {
  const [formErrors, setFormErrors] = useState<any>({});
  const [values, setValues] = useState({
    id: "",
    productName: "",
    productDesc: "",
    productUniqueId: "",
    category: "",
    assetLocation: "",
    wareHouseLocation: "",
    quantity: "",
    cost: "",
    partNumber: "",
    binLocation: "",
    productImage: "",
    expiryDate: "",
    action: "",
  });
  return (
    <DialogModal
      showFooter={false}
      size="md:w-1/2"
      isModalVisible={showAddProductModal}
      modalTitle="Add New Product"
      onClosed={onClosed}
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
            value={values.productDesc}
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

        <div className="mb-3">
          <FileInput
            label="Product Image"
            onFileChange={(data: any) => {
              setValues({
                ...values,
                ...data,
              });
            }}
            id="firstName"
            value={values?.productImage}
            size="md:w-full"
            onFileChangeError={(data: any) => {
              setFormErrors({
                ...formErrors,
                ...data,
              });
            }}
          />
        </div>

        <div>
          <PrimaryButton buttonText="Submit" height="py-4" />
        </div>
      </div>
    </DialogModal>
  );
}
