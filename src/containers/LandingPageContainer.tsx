import UserAreaHeader from "../components/header/UserAreaHeader";

export default function LandingPageContainer({ children }: any) {
    return (
        <>
            <UserAreaHeader />
            <div>SliderBar</div>
            {children}
        </>
    )
}