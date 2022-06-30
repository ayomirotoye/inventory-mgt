import PageHeader from "../components/header/PageHeader";
import DashboardContainer from "../containers/DashboardContainer";

export default function Profile({ }: any) {
    return (
        <DashboardContainer>
            <PageHeader
                title="Profile"
                description="My Profile"
            />
            

        </DashboardContainer>
    )
}