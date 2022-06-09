import { useState } from "react";
import { converterToCustomList, hasKeys, isEmptyString, isNullOrUndefined } from "../../libs/helper";
import PrimaryButton from "../buttons/PrimaryButton";
import DialogModal from "../modals/DialogModal";

let ChevronDownIcon = require('../../assets/images/chevron-down.svg').default;

export default function CustomDropdownOptions({
    arrOfOptions,
    onChange,
    currentLabel,
    className = "",
    labelTitle,
    optionTitle,
    labelField,
    valueField,
    descriptionField,
    addNew = {},
    border = "border-green-900 border-2"
}: any) {

    const [optionsAreVisible, setOptionsAreVisible] = useState(false);

    const onClose = () => {
        setOptionsAreVisible(false);
    }

    const handleChange = (label: any, value: any) => {
        onChange(label, value);
        onClose();
    }

    return (
        <div className={className} key={labelTitle}>
            <div className="flex justify-start mb-3 text-sm font-bold">{labelTitle}</div>
            <div className={`flex justify-between font-semibold items-center ${border} px-3 rounded-lg cursor-pointer `}
                onBlur={onClose}
                onClick={() => setOptionsAreVisible(true)}>
                <div className="m-3 flex-none w-14 truncate">{isNullOrUndefined(currentLabel) || isEmptyString(currentLabel) ? "---" : currentLabel}</div>
                <div onClick={() => setOptionsAreVisible(true)}><img src={ChevronDownIcon} alt='' className="cursor-pointer" /></div>
            </div>
            <DialogModal
                isModalVisible={optionsAreVisible}
                onClosed={onClose}
                modalTitle={optionTitle}
                showFooter={false}
                size=""
            >
                {hasKeys(addNew) &&
                    <div className="flex justify-end ">
                        <div className="w-1/2 sm:w-1/5 text-sm text-green-900 mb-3 font-bold overflow-auto">
                            <PrimaryButton
                                className="py-2 w-full font-bold bg-green-700 text-white rounded-lg border-0 cursor-pointer"
                                onClicked={addNew.handleClick}
                                buttonText={addNew.buttonText}
                            />
                        </div>
                    </div>}

                {converterToCustomList(arrOfOptions, labelField, valueField, descriptionField).map((items: any, index: number) => {
                    return <div
                        key={"order_type_list".concat("_", String(index), "_", items.value)}
                        className='order-type-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'
                        style={{ borderBottom: '1px solid rgba(243, 244, 246, 1)' }}
                        tabIndex={0}
                        role="option"
                        onClick={() => handleChange(items.label, items.value)}
                    >
                        <div onClick={onClose}>
                            <p className='leading-normal font-bold h-1'>{items.label}</p>
                            <p className='text-xs leading-normal'>{items.description}</p>
                            <p className='element-cover'></p>
                        </div>
                    </div>
                })}

            </DialogModal>
        </div>
    )
}