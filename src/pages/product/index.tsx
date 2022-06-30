import PageHeader from "../../components/header/PageHeader";
import DashboardContainer from "../../containers/DashboardContainer";
import ProductSection from "../micro-components/ProductSection";

export default function Product({ }: any) {
    return (
        <DashboardContainer>
            <PageHeader
                title="Product"
                description="View and browse products"
            />
            <ProductSection
                title="Grey Stock | Non-grey Stock | Others"
            />
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


        </DashboardContainer>
    )
}