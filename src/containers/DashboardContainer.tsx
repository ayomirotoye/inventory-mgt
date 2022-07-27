import UserAreaHeader from "../components/header/UserAreaHeader";
import Sidebar from "./sidebar/Index";

export default function DashboardContainer({ children }: any) {

  return (
    <main>
      <div className="sticky top-0 z-[10010]">
        <UserAreaHeader isLoggedIn={true} />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-primary-400 overflow-y-none px-3">
          <Sidebar />
        </div>
        <div className="col-span-10 px-10 py-5 bg-gray-100 overflow-y-auto bg-gray-200 h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
