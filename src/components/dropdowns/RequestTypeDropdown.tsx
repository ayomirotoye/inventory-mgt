import { useEffect, useState } from "react";
import SpinnerLoader from "../loaders/spinner";
import CustomDropdown from "./CustomDropdown";


export default function RequestTypeDropdown({
    isVisible,
    value,
    onChange,
    className = 'w-full',
    labelTitle = "Request Type",
    labelClassName="",
    optionTitle = ""
}: any) {

    const [, setOptionsAreVisible] = useState(isVisible);
    const [dataList] = useState([
        {
            name: "Buy",
            code: "buy"
        },
        {
            name: "Loan",
            code: "loan"
        }
    ]);
    const [isLoading] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (!isVisible) {
            setOptionsAreVisible(false);
            return;
        }
        setOptionsAreVisible(true);
    }, [isVisible]);

    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/exhaustive-deps

    //     let isSubscribed = true;
    //     const getCategories = async () => {
    //         setIsLoading(true);
    //         const dataList = await getCallCategoriesUrl();
    //         setIsLoading(false);
    //         if (isSubscribed) {
    //             setDataList([]);
    //         }
    //     }


    //     getCategories();
    //     return () => {
    //         isSubscribed = false;
    //     };
    // }, []);

    return (
        <>
            <div className={className}>
                {isLoading ? <SpinnerLoader isLoading={isLoading} /> : <CustomDropdown
                    arrOfOptions={dataList?.map((items: any) => {
                        return {
                            label: items.name,
                            value: items.code,
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