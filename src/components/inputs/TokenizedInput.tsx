import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNullOrUndefined, isNumeric, sanitizeAsNumber } from "../../libs/helper";
import CustomInput from "./CustomInput";

const initArray = (inputLength: number) => {
    let arr: number[] = [];
    for (let index = 0; index < inputLength; index++) {
        arr.push(index);
    }
    return arr;
}

export default function TokenizedInput({
    inputLength = 6,
    onType,
    onDelete,
    tokenType = "number",
    name = "token",
    resendText = "",
    onResend }: any) {

    const tokenInputData = useSelector(
        (state: any) => state.authReducer?.tokenInputData
    );
    const dispatch = useDispatch();

    const [isAppend, setIsAppend] = useState(false);
    const [accDigitJsxElements, setAccDigitJsxElements] = useState<JSX.Element[]>([]);

    const refs = useMemo(() => initArray(inputLength).map((_val, _i: any) => {
        return React.createRef<HTMLInputElement>();
    }), []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let val: string = e.target.value.toString();
        let index: any = e.target.name.split("_")[1]
        if ((!isNullOrUndefined(tokenInputData))) {
            if (tokenType === "number") {
                if (isNumeric(val)) {
                    onType({ val: sanitizeAsNumber(val), index: index });
                    setIsAppend(true);
                }
            } else {
                onType({ val: val, index: index });
                setIsAppend(true);
            }
        }
    };

    const onKeyDown = useMemo(() =>
        (e: any) => {
            let index = e.target.name.split("_")[1]
            if (e.key === 'Delete' || e.key === 'Backspace') {
                setIsAppend(false);
                onDelete(index);
                e.target.value = "";

                if (index > 0) {
                    refs[index - 1].current?.focus();
                } else {
                    refs[0].current?.focus();
                }

            }
        }, []);




    const defineFocus = (enterTokenValueLength: number) => {
        if (enterTokenValueLength <= inputLength) {
            if (refs[enterTokenValueLength] !== null && refs[enterTokenValueLength] != undefined) {
                refs[enterTokenValueLength].current?.focus();
            }
        } else {
            return;
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // dispatch(clearTokenInputData());
        const filler: JSX.Element[] = [];
        for (let index = 0; index < inputLength; index++) {
            filler.push(
                <div key={"tokenized_input_" + index}>
                    <CustomInput
                        onChange={onChange}
                        value={sanitizeAsNumber(refs[index].current?.value)}
                        hideableLabelText=" "
                        fixedLabelText=""
                        type="password"
                        ref={refs[index]}
                        name={name.concat("_", index)}
                        maxLength={1}
                        onKeyDown={onKeyDown}
                        compKey={"otpBox_" + index}
                        autoFocus={index === 0}
                        inputClassName="text-center"
                    />
                </div>
            );
        }

        setAccDigitJsxElements(filler);
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (!isNullOrUndefined(tokenInputData)) {
            if (!isAppend) {
                return;
            }
            let enteredTokenValueLength = tokenInputData?.length;
            defineFocus(enteredTokenValueLength);
        }
    }, [tokenInputData]);

    return (
        <>
            <div className="flex content-center h-56 grid gap-4">
                <div className={`grid grid-cols-${inputLength} gap-4`}>
                    {accDigitJsxElements}
                </div>
                {resendText.length > 0 && <div className="flex justify-center align-center ms-1 mb-2 cursor-pointer" onClick={onResend}>
                    <p><svg className="object-contain h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>{resendText}</p>
                </div>}
            </div>
        </>
    )
}
