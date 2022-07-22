import { useEffect, useState } from "react";
import { isNullOrUndefined } from "../../libs/helper";
import { getCallUserRolesUrl } from "../../services/utilityService";
import SpinnerLoader from "../loaders/spinner";
import CustomDropdown from "./CustomDropdown";


export default function UserRoleDropdown({
    isVisible,
    value,
    onChange,
    className = 'w-full',
    labelTitle = "User Role",
    labelClassName = "",
    optionTitle = ""
}: any) {

    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [, setOptionsAreVisible] = useState(isVisible);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (!isVisible) {
            setOptionsAreVisible(false);
            return;
        }
        setOptionsAreVisible(true);
    }, [isVisible]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let isSubscribed = true;
        const getUserRoles = async () => {
            setIsLoading(true);
            const dataList = await getCallUserRolesUrl();
            console.log("datal::", dataList)
            setIsLoading(false);
            if (isSubscribed) {
                setDataList(dataList);
            }
        }


        getUserRoles();
        return () => {
            isSubscribed = false;
        };
    }, []);

    const convertToLabelValue = (dataList: any) => {
        let arrOptions = []
        if (!isNullOrUndefined(dataList)) {
            arrOptions = dataList?.map((items: any) => {
                return {
                    label: items.name,
                    value: items.id,
                }
            })
        }

        return arrOptions;
    }
    return (
        <>
            <div className={className}>
                {isLoading ? <SpinnerLoader isLoading={isLoading} /> : <CustomDropdown
                    arrOfOptions={convertToLabelValue(dataList)?.map((items: any) => {
                        return {
                            label: items.label,
                            value: items.value,
                        }
                    })}
                    onChange={onChange}
                    isVisible={isVisible}
                    currentLabel={value}
                    labelTitle={labelTitle}
                    labelClassName={labelClassName}
                    optionTitle={optionTitle}
                    labelField="label"
                    valueField="value"
                    descriptionField="description"
                    className="md:w-full md:mb-3 sm:mb-3"
                    selectedOptionClassName="text-md"
                />
                }
            </div>
        </>
    )
}