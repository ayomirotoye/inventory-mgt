import { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomInput from "../../../components/inputs/CustomInput";
import FileInput from "../../../components/inputs/FileInput";
import DialogModal from "../../../components/modals/DialogModal";

export default function NewProductUploadModal({
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
