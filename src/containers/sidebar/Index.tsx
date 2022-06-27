import { navbarItems } from "../../common/urlPaths";
import MenuDropdown from "../../components/dropdowns/MenuDropdown";
import './index.scss';

export default function Sidebar() {
    return (
        <div className={`h-screen py-4 ease-in transition-medium overflow-x-none`}>
            <nav>
                {
                    navbarItems.map((items: any, index: number) => {
                        return <div className={`my-5 lg:mt-5 lg:mx-5`} key={`menudropdown_${items?.menuTitle}_${index}`} id={`menudropdown_${items.menuTitle}_${index}`}>
                            <MenuDropdown menuList={items} />
                        </div>
                    })
                }
            </nav>
        </div>
    );
}