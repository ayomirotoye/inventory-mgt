import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import colors from "tailwindcss/colors";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PageHeader from "../components/header/PageHeader";
import DashboardContainer from "../containers/DashboardContainer";
import NewProductModal from "../pages/product/micro-components/NewProductModal";
import ProductSection from "../pages/product/micro-components/ProductSection";

export default function Product({}: any) {
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);

  const addNewProduct = () => {
    setShowAddNewProduct(true);
  };
  return (
    <DashboardContainer>
      <PageHeader
        title="Product"
        description="View and browse products"
        /* addNew={
                    <PrimaryButton
                        onClicked={addNewProduct}
                        height="py-2 px-3 mb-2 md:mb-0"
                        className="w-full font-bold bg-white text-black rounded-lg border-2 border-red-900 cursor-pointer"
                    >
                        <span className="flex justify-between inline-block align-middle items-center">
                            <AiOutlinePlus fill={colors.yellow[400]} strokeWidth={10} className="h-5 w-5" />
                            Add New Product
                        </span>
                    </PrimaryButton>
                } */
      />
      <ProductSection title="Grey Stock | Non-grey Stock | Others" />
      <ProductSection
        title="Newly Added"
        titlebarBgColor="bg-primary-800 text-white"
        arrowStrokeColor="white"
      />
      <ProductSection
        title="Low Quantity Stock"
        titlebarBgColor="bg-primary-700 text-white"
        arrowStrokeColor="white"
      />
      {showAddNewProduct && (
        <NewProductModal
          showAddProductModal={showAddNewProduct}
          onClosed={() => setShowAddNewProduct(false)}
        />
      )}
    </DashboardContainer>
  );
}
