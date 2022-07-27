import { useEffect, useState } from "react";
import { getCallUserRolesUrl } from "../../services/utilityService";
import SpinnerLoader from "../loaders/spinner";
import CustomDropdown from "./CustomSelect";


export default function UserRoleDropdown({
    value,
    onChange,
    className = 'w-full',
    labelTitle = "User Role",
    labelClassName = "",
    optionTitle = ""
}: any) {

    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let isSubscribed = true;
        const getUserRoles = async () => {
            setIsLoading(true);
            const dataList = await getCallUserRolesUrl();
            setIsLoading(false);
            if (isSubscribed) {
                console.log("dataList::", dataList);
                setDataList(dataList);
            }
        }


        getUserRoles();
        return () => {
            isSubscribed = false;
        };
    }, []);

    return (
        <>
            <div className={className}>
                {isLoading ? <SpinnerLoader /> :
                    <CustomDropdown
                        arrOfOptions={dataList}
                        onChange={onChange}
                        value={value}
                        labelTitle={labelTitle}
                        labelClassName={labelClassName}
                        optionTitle={optionTitle}
                        labelField="name"
                        valueField="id"
                        className="md:w-full md:mb-3 sm:mb-3"
                        selectedOptionClassName="text-md"
                    />
                }
            </div>
        </>
    )
}