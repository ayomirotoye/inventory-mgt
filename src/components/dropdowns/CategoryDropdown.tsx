import { useEffect, useState } from "react";
import { getCallCategoriesUrl } from "../../services/utilityService";
import SpinnerLoader from "../loaders/spinner";
import CustomDropdown from "./CustomSelect";


export default function CategoryDropdown({
    isVisible,
    value,
    onOpen,
    onClose,
    onChange,
    className = 'w-full',
    labelTitle = "Category",
    optionTitle = ""
}: any) {

    const [, setOptionsAreVisible] = useState(isVisible);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        const getCategories = async () => {
            setIsLoading(true);
            const dataList = await getCallCategoriesUrl();
            setIsLoading(false);
            if (isSubscribed) {
                setDataList([]);
            }
        }


        getCategories();
        return () => {
            isSubscribed = false;
        };
    }, []);

    return (
        <>
            <div className={className}>
                {isLoading ? <SpinnerLoader /> : <CustomDropdown
                    arrOfOptions={dataList?.map((items: any) => {
                        return {
                            label: items.name,
                            value: items.code,
                        }
                    })}
                    onChange={onChange}
                    isVisible={isVisible}
                    currentLabel={value}
                    onOpen={onOpen}
                    onClose={onClose}
                    labelTitle={labelTitle}
                    optionTitle={optionTitle}
                    labelField="label"
                    valueField="value"
                    descriptionField="description"
                    className="md:w-full md:mb-3 sm:mb-3"
                />
                }
            </div>
        </>
    )
}