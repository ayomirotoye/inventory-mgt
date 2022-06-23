import { forwardRef, useState } from "react";
import {
    isNullOrUndefined, isValidMonth,
    isValidYear, sanitizeAsNumber
} from "../../libs/helper";
import DialogModal from "../modals/DialogModal";

let InfoIcon = require('../../assets/icons/close.svg').default;

const defineValue = (value: any, type = "text") => {
    return type === "number" ? sanitizeAsNumber(value) : type === "custom_month"
        ? isValidMonth(value) : type === "custom_year"
            ? isValidYear(value) : isNullOrUndefined(value) ? "" : value;
}
const CustomInput = (
    {
        onChange,
        value,
        hideableLabelText = "",
        fixedLabelText,
        type = "number",
        inputFontSize = "text-3xl",
        className = "w-full",
        name = "",
        autoFocus = false,
        maxLength = "",
        onKeyDown,
        compKey,
        index,
        inputClassName = "",
        readOnly = false,
        error = {},
        errorModal = true
    }: any, ref: any) => {
    const [showError, setShowError] = useState(false);
    const hasError = () => {
        return (!isNullOrUndefined(error) && error?.hasError) || (type === "number" && value < 0);
    }

    return (
        <>
            <div className={className}>
                <div className='text-sm font-bold mb-3 md:flex justify-between'>
                    <span className="md:hidden">{hideableLabelText} </span><span>{fixedLabelText}</span>
                    <div>{
                        hasError() ?
                            <InfoIcon
                                onClick={() => setShowError(true)}
                                strokeWidth="2"
                                stroke="white"
                                fill="red" />
                            : []}
                    </div>
                </div>
                {!isNullOrUndefined(onChange) || !readOnly ?
                    isNullOrUndefined(ref) ?
                        <div className={`grow border-2  ${hasError() ? "border-red-900" : "border-black-900"} rounded-md text-left px-3 py-3`}>
                            <input
                                key={compKey ?? fixedLabelText.concat("_", String(index))}
                                autoFocus={autoFocus}
                                name={name}
                                className={`focus:outline-none ${inputFontSize} text-primary-900 w-full font-bold ${inputClassName}`}
                                onChange={onChange}
                                value={defineValue(value, type)}
                                type={type}
                                onKeyDown={onKeyDown}
                                maxLength={maxLength}
                            />
                            {!errorModal &&
                                <div className="text-red-500 text-sm font-semibold my-5">{(!isNullOrUndefined(error) && error?.hasError) || (type === "number" && value < 0) ? error?.message : []}
                                </div>
                            }
                        </div>
                        : <div className="grow border-2 border-primary-900 rounded-md text-left py-1 px-1 h-10">
                            <><input
                                ref={ref}
                                key={compKey ?? fixedLabelText.concat("_", String(index))}
                                autoFocus={autoFocus}
                                name={name}
                                className={`align-middle focus:outline-none ${inputFontSize} text-primary-900 w-full font-bold ${inputClassName}`}
                                onChange={onChange}
                                value={ref?.current?.value}
                                type={type}
                                onKeyDown={onKeyDown}
                                maxLength={maxLength}
                            /></>
                        </div>
                    : <div className="bg-gray-100 grow border border-3 align-middle border-primary-900 border-solid rounded-md text-left py-1 px-1 h-10">
                        <div className=''>
                            <div className={`${inputFontSize} text-primary-900 w-full font-bold`}>{value}</div>
                        </div>
                    </div>}
            </div>
            {errorModal && <DialogModal
                modalTitle="Error info"
                onClosed={() => setShowError(false)}
                confirmAction={() => setShowError(false)}
                isModalVisible={showError}
                modalConfirmationText={"Error info"}
            >{error?.message}</DialogModal>}
        </>
    );
}

export default forwardRef(CustomInput);
