import { useState } from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { converterToCustomList, hasKeys, isEmptyString, isNullOrUndefined } from "../../libs/helper";
import PrimaryButton from "../buttons/PrimaryButton";
import DialogModal from "../modals/DialogModal";


export default function CustomDropdown({
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
    border = "border-primary-400 border-2"
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
            <div className={`flex justify-between bg-white font-semibold items-center ${border} px-3 rounded-lg cursor-pointer `}
                onBlur={onClose}
                onClick={() => setOptionsAreVisible(true)}>
                <div className="m-3 flex flex-row truncate text-[12px] h-6">{isNullOrUndefined(currentLabel) || isEmptyString(currentLabel) ? <p className="object-contain">-- Category/ Products --</p> : currentLabel}</div>
                <div className="flex-none" onClick={() => setOptionsAreVisible(true)}>
                    <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                        stroke="#000000"
                    />
                </div>
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
                        className='order-type-list cursor-pointer py-2 bg-white-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'
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