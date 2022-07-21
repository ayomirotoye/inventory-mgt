import { Switch } from "@headlessui/react";
import { format } from "date-fns";
// import moment from "moment";
import { useMemo, useState } from "react";
import {
    capitaliseFirstLetter, formatCurrencyWithDecimal,
    hasKeys, isNullOrUndefined, splitString
} from "../../libs/helper";
import PrimaryButton from "../buttons/PrimaryButton";
import { AvatarIcon } from "../icons/AvatarIcon";
import { BellIcon } from "../icons/BellIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import SearchInput from "../inputs/SearchInput";
import MyPopover from "../MyPopover";

import Pagination from "../pagination";


const TableHeader = ({ name, className = "px-3 py-3" }: any) => {
    return (
        <th className={`${className} text-left`}>{name}</th>
    )
}

const TableData = ({ children = [], tdClassName }: any) => {
    return (
        <td className={tdClassName}>
            {children}
        </td>
    )
}

export default function AppTable({
    dataList,
    headerList,
    actionButtonList,
    currentPage,
    totalCount,
    PageSize = 10,
    onPageChange,
    keyPrefix = "app_table_record",
    tdClassName = "font-bold",
    keyField,
    needsEmphasis = {},
    isSelectable = true,
    onViewDetails,
    handleAll
}: any) {

    const [tableDiv, setTableDiv] = useState(Object.assign([]));
    const [enabled, setEnabled] = useState<any>(
        {
            all: false,
            1: false
        })

    const switchAll = (isOn: boolean) => {
        setEnabled({ ...enabled, all: !enabled.all });
        handleAll(isOn);
    }

    useMemo(() => {
        if (isNullOrUndefined(dataList)) {
            return;
        }
        setTableDiv(<>

            <div className='bg-white rounded shadow overflow-x-auto sm:rounded mb-5 p-5'>
                <SearchInput
                    widthClass="w-full border-4 border-primary-900 rounded-md my-3"
                />
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        {
                            isSelectable ?
                                <tr className='' style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    <TableHeader
                                        className="px-0 py-3"
                                        name={
                                            <Switch
                                                checked={enabled.all}
                                                onChange={switchAll}
                                                className={`${enabled.all ? 'bg-primary-600' : 'bg-gray-200'
                                                    } absolute inline-flex h-6 w-11 items-center rounded-full z-[999]`}
                                            >
                                                <span className="sr-only"></span>
                                                <span
                                                    className={`${enabled.all ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block h-4 w-4 transform rounded-full bg-white`}
                                                />
                                            </Switch>
                                        } />
                                    {Object.values(headerList)?.map((items: any) => {
                                        return <TableHeader key={"table_header_".concat(items === "" ? Math.random() : items)}
                                            name={["icon", "action", "notificationIcon"].includes(items)
                                                ? "" : capitaliseFirstLetter(items)} />
                                    })}
                                </tr> :
                                <tr className='' style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    {Object.values(headerList)?.map((items: any) => {
                                        return <TableHeader key={"table_header_".concat(items === "" ? Math.random() : items)}
                                            name={["icon", "action", "notificationIcon"].includes(items)
                                                ? "" : capitaliseFirstLetter(items)} />
                                    })}
                                </tr>
                        }

                    </thead>
                    <tbody>
                        {dataList?.map((dataItems: any, index: number) =>
                            <tr key={index} className="hover:bg-gray-100 focus-within:bg-gray-100 h-7 cursor-pointer"
                                onClick={isNullOrUndefined(onViewDetails) ? () => onViewDetails(dataItems) : () => null}>
                                <>{isSelectable && <TableData className={tdClassName}>
                                    {
                                        <Switch
                                            checked={enabled[String(index)]}
                                            onChange={() => setEnabled({ ...enabled, [String(index)]: !enabled[String(index)] })}
                                            className={`${enabled[String(index)] || enabled.all ? 'bg-primary-600' : 'bg-gray-200'
                                                } relative inline-flex h-6 w-11 items-center rounded-full z-[999]`}
                                        >
                                            <span className="sr-only"></span>
                                            <span
                                                className={`${enabled[String(index)] || enabled.all ? 'translate-x-6' : 'translate-x-1'
                                                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                                            />
                                        </Switch>
                                    }</TableData>}
                                </>
                                {
                                    Object.entries(headerList).map(([key]: any) => {
                                        if (key === "icon") {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), dataItems[key], index, "_icon_table_data")}>
                                                <AvatarIcon className="w-5 h-5" />
                                            </TableData>
                                        } else if (key === "notificationIcon") {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), dataItems[key], index, "_icon_table_data")}>
                                                <div className={`rounded-full ${!isNullOrUndefined(dataItems["status"]) ? (dataItems["status"].toLowerCase() === ("success") ? "bg-green-200" : "bg-red-200") : "bg-gray-100"} px-auto shadow-sm py-auto p-2 md:mb-0 mb-3 md:w-fit`}>
                                                    {isNullOrUndefined(dataItems[key]) ? <BellIcon /> : dataItems[key]}
                                                </div>
                                            </TableData>
                                        } else if (key === "sn") {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), "_", dataItems[key], headerList[key], index, "_td_table_data")}>
                                                <p className={`text-sm px-2`}> {currentPage > 1 ? (index + PageSize) + 1 : (index + 1) * currentPage}</p>
                                            </TableData>
                                        }
                                        else if (key === "action") {
                                            return <TableData className={tdClassName.concat(" mb-5")} key={keyPrefix.concat(String(dataItems[keyField]), dataItems[key], index, "_action_table_data")}>
                                                <div className='flex justify-end space-x-5'>
                                                    <MyPopover
                                                        showAs="div"
                                                        panelClassName="p-3 bg-secondary-200"
                                                        panelWidth="w-40"
                                                        showContent={
                                                            <PrimaryButton
                                                                className="w-14 font-bold bg-primary-900 text-white rounded-lg border-0 cursor-pointer mb-3"
                                                            >
                                                                <span className="flex justify-center">
                                                                    <ChevronDownIcon className="w-5 h-5" />
                                                                </span>
                                                            </PrimaryButton>}
                                                        listItems={
                                                            actionButtonList?.map((items: any) => {
                                                                return (
                                                                    {
                                                                        name: items.actionText,
                                                                        onClick: items.handleClick,
                                                                        hasIcon: items.hasIcon
                                                                    }
                                                                )
                                                            })
                                                        }
                                                    />

                                                </div>
                                            </TableData>
                                        }
                                        else if (key.indexOf("amount") > -1) {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), "_", dataItems[key], headerList[key], index, "_td_table_data")}>
                                                <p className={`text-sm px-2`}>₦ {formatCurrencyWithDecimal(dataItems[key])}</p>
                                            </TableData>
                                        }
                                        else if (["date", "createdOn", "updatedOn"].includes(key)) {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), "_", dataItems[key], headerList[key], index, "_td_table_data")}>
                                                <p className={`text-sm px-2`}>{format(new Date(dataItems[key]), "LLLL")}</p>
                                            </TableData>
                                        }
                                        else {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), "_", dataItems[key], headerList[key], index, "_td_table_data")}>
                                                <p className={`text-sm px-2 ${hasKeys(needsEmphasis) ? (dataItems[needsEmphasis?.emphasisCheckField] === false ? "font-bold" : "font-default") : "font-semibold"}`}>{splitString(dataItems[key], "_")}</p>
                                            </TableData>
                                        }
                                    })
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {dataList?.length > 0 &&
                <div className={dataList.length > 0 ? 'flex justify-center mb-10' : 'hidden'}>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={PageSize}
                        onPageChange={onPageChange}
                    />
                </div>}
        </>
        )
    }, [dataList, enabled])
    return (
        <>{tableDiv}</>
    );
}