import moment from "moment";
import { useMemo, useState } from "react";
import { AvatarIcon } from "../../assets/icons/AvatarIcon";
import { BellIcon } from "../../assets/icons/BellIcon";
import { isNullOrUndefined, capitaliseFirstLetter, hasKey, hasKeys, formatCurrencyWithDecimal, splitString } from "../../libs/helper";

import Pagination from "../pagination";


const TableHeader = ({ name }: any) => {
    return (
        <th className='px-3 py-3 text-left'>{name}</th>
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
    needsEmphasis = {}
}: any) {

    const [tableDiv, setTableDiv] = useState(Object.assign([]));

    useMemo(() => {
        if (isNullOrUndefined(dataList)) {
            return;
        }
        setTableDiv(<>

            <div className='bg-white rounded shadow overflow-x-auto sm:rounded mb-5 p-5'>
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className='' style={{ borderBottom: '2px solid #e2e8f0' }}>
                            {Object.values(headerList)?.map((items: any) => {
                                return <TableHeader key={"table_header_".concat(items === "" ? Math.random() : items)}
                                    name={["icon", "action", "notificationIcon"].includes(items)
                                        ? "" : capitaliseFirstLetter(items)} />
                            })}
                        </tr>
                    </thead>
                    <tbody>

                        {dataList?.map((dataItems: any, index: any) =>
                            <tr key={index} className="hover:bg-gray-100 focus-within:bg-gray-100">
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
                                        }
                                        else if (key === "action") {
                                            return <TableData className={tdClassName} key={keyPrefix.concat(String(dataItems[keyField]), dataItems[key], index, "_action_table_data")}>
                                                <div className='flex justify-end space-x-5'>
                                                    {actionButtonList?.map((items: any, index: number) => {
                                                        return hasKey(items, "isVisible") ? items.isVisible(dataItems[items.visibilityConditionField]) && <button
                                                            key={keyPrefix.concat(String(dataItems[keyField]), index)}
                                                            data-itemdata={JSON.stringify(dataItems)}
                                                            onClick={items.handleClick}
                                                            className={items.btnClassName ?? "rounded-lg bg-green-800 px-5 border-0 text-white cursor-pointer text-sm"}>
                                                            {hasKeys(items.hasIcon) ? <img alt={items.hasIcon.alt} src={items.actionText} data-itemdata={JSON.stringify(dataItems)}
                                                                onClick={items.handleClick} className="object-contain h-5 w-5" /> : items.actionText}
                                                        </button> : <button
                                                            key={keyPrefix.concat(String(dataItems[keyField]), index)}
                                                            data-itemdata={JSON.stringify(dataItems)}
                                                            onClick={items.handleClick}
                                                            className={items.btnClassName ?? "rounded-lg bg-green-800 px-5 border-0 text-white cursor-pointer text-sm"}>
                                                            {hasKeys(items.hasIcon) ? <img alt={items.hasIcon.alt} src={items.actionText} data-itemdata={JSON.stringify(dataItems)}
                                                                onClick={items.handleClick} className="object-contain h-5 w-5" /> : items.actionText}
                                                        </button>
                                                    })}
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
                                                <p className={`text-sm px-2`}>{moment(dataItems[key]).format('LLLL')}</p>
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
    }, [dataList])
    return (
        <>{tableDiv}</>
    );
}