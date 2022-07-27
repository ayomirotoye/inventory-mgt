import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";
import colors from "tailwindcss/colors";
import {
  capitaliseFirstLetter,
  formatCurrencyWithDecimal, hasKey, hasKeys,
  isNullOrUndefined,
  splitString
} from "../../libs/helper";
import { AvatarIcon } from "../icons/AvatarIcon";
import { BellIcon } from "../icons/BellIcon";
import SearchInput from "../inputs/SearchInput";
import MyPopoverMenu from "../MyPopoverMenu";

import Pagination from "../pagination";
import StatusBadge from "../StatusBadge";

const TableHeader = ({ name, className = "px-3 py-3" }: any) => {
  return <th className={`${className} text-left`}>{name}</th>;
};

const TableData = ({ children = [], tdClassName }: any) => {
  return <td className={tdClassName}>{children}</td>;
};

const initArray = (inputLength: number) => {
  let arr: number[] = [];
  for (let index = 0; index < inputLength; index++) {
    arr.push(index);
  }
  return arr;
}

export default function AppTable({
  dataList = [],
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
}: any) {
  const [tableDiv, setTableDiv] = useState(Object.assign([]));

  const refs = useMemo(() => initArray(dataList.length).map((_val, _i: any) => {
    return React.createRef<HTMLInputElement>();
  }), [dataList]);

  const switchAll = (e: any) => {
    if (e.target.checked) {
      for (let i = 0; i < refs.length; i++) {
        Object.assign(refs[i]).current.checked = true;
      }
    } else {
      for (let i = 0; i < refs.length; i++) {
        Object.assign(refs[i]).current.checked = false;
      }
    }
  };

  useMemo(() => {
    if (isNullOrUndefined(dataList)) {
      return;
    }
    setTableDiv(
      <div >
        <div className="bg-white rounded shadow overflow-x-auto sm:rounded mb-5 p-5 table-div" >
          <SearchInput widthClass="w-full border-4 border-primary-900 rounded-md my-3" />
          <table className="w-full whitespace-no-wrap">
            <thead>
              {isSelectable ? (
                <tr className="" style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <TableHeader
                    className="px-0 py-3"
                    name={
                      <input
                        type="checkbox"
                        onChange={switchAll}
                        className="border-gray-300 rounded-lg h-5 w-5 accent-pink-500 cursor-pointer" />
                    }
                  />
                  {Object.values(headerList)?.map((items: any) => {
                    return (
                      <TableHeader
                        key={"table_header_".concat(
                          items === "" ? Math.random() : items
                        )}
                        name={
                          ["icon", "action", "notificationIcon"].includes(items)
                            ? ""
                            : capitaliseFirstLetter(items)
                        }
                      />
                    );
                  })}
                </tr>
              ) : (
                <tr className="" style={{ borderBottom: "2px solid #e2e8f0" }}>
                  {Object.values(headerList)?.map((items: any) => {
                    return (
                      <TableHeader
                        key={"table_header_".concat(
                          items === "" ? Math.random() : items
                        )}
                        name={
                          ["icon", "action", "notificationIcon"].includes(items)
                            ? ""
                            : capitaliseFirstLetter(items)
                        }
                      />
                    );
                  })}
                </tr>
              )}
            </thead>
            <tbody>
              {dataList?.map((dataItems: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 focus-within:bg-gray-100 h-7 cursor-pointer"
                  onClick={
                    !isNullOrUndefined(onViewDetails)
                      ? () => onViewDetails(dataItems)
                      : () => null
                  }
                >
                  <>
                    {isSelectable && (
                      <TableData className={tdClassName}>
                        {
                          <input type="checkbox"
                            ref={refs[index]}
                            className="border-gray-300 rounded h-5 w-5" />
                        }
                      </TableData>
                    )}
                  </>
                  {Object.entries(headerList).map(([key]: any) => {
                    if (key === "icon") {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            dataItems[key],
                            index,
                            "_icon_table_data"
                          )}
                        >
                          <AvatarIcon className="w-5 h-5" />
                        </TableData>
                      );
                    } else if (key === "notificationIcon") {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            dataItems[key],
                            index,
                            "_icon_table_data"
                          )}
                        >
                          <div
                            className={`rounded-full ${!isNullOrUndefined(dataItems["status"])
                              ? dataItems["status"].toLowerCase() ===
                                "success"
                                ? "bg-green-200"
                                : "bg-red-200"
                              : "bg-gray-100"
                              } px-auto shadow-sm py-auto p-2 md:mb-0 mb-3 md:w-fit`}
                          >
                            {isNullOrUndefined(dataItems[key]) ? (
                              <BellIcon />
                            ) : (
                              dataItems[key]
                            )}
                          </div>
                        </TableData>
                      );
                    } else if (key === "sn") {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            "_",
                            dataItems[key],
                            headerList[key],
                            index,
                            "_td_table_data"
                          )}
                        >
                          <p className={`text-sm px-2`}>
                            {" "}
                            {currentPage > 1
                              ? index + PageSize + 1
                              : (index + 1) * currentPage}
                          </p>
                        </TableData>
                      );
                    } else if (key === "action") {
                      return (
                        <TableData
                          className={tdClassName.concat(" mb-5")}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            dataItems[key],
                            index,
                            "_action_table_data"
                          )}
                        >
                          <div className="flex justify-end space-x-5">
                            <MyPopoverMenu
                              showTriggerComponent={{
                                whenOpen: <BsChevronBarUp stroke={colors.white} fill={colors.white} />,
                                whenHidden: <BsChevronBarDown stroke={colors.white} fill={colors.white} />
                              }}
                              panelWidth="sm:w-1/2 w-1/5"
                              listItems={actionButtonList?.map((items: any) => {
                                return !(
                                  hasKey(items, "isVisible") &&
                                  items.isVisible(
                                    dataItems[items.visibilityConditionField]
                                  )
                                )
                                  ? {
                                    name: items.actionText,
                                    onClick: items.handleClick,
                                    hasIcon: items.hasIcon,
                                    data: dataItems,
                                    isVisible: items.isUserActive,
                                  }
                                  : null;
                              })}
                            />
                            {/* <MyPopover
                              showAs="div"
                              panelClassName="p-3 bg-secondary-200"
                              panelWidth="w-40"
                              showContent={
                                <PrimaryButton className="w-14 font-bold bg-primary-900 text-white rounded-lg border-0 cursor-pointer mb-3">
                                  <span className="flex justify-center">
                                    <ChevronDownIcon className="w-5 h-5" />
                                  </span>
                                </PrimaryButton>
                              }
                              listItems={actionButtonList?.map((items: any) => {
                                return !(
                                  hasKey(items, "isVisible") &&
                                  items.isVisible(
                                    dataItems[items.visibilityConditionField]
                                  )
                                )
                                  ? {
                                      name: items.actionText,
                                      onClick: items.handleClick,
                                      hasIcon: items.hasIcon,
                                      data: dataItems ,
                                      isVisible: items.isUserActive,
                                    }
                                  : null;
                              })}
                            /> */}
                          </div>
                        </TableData>
                      );
                    } else if (key.indexOf("amount") > -1) {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            "_",
                            dataItems[key],
                            headerList[key],
                            index,
                            "_td_table_data"
                          )}
                        >
                          <p className={`text-sm px-2`}>
                            ₦ {formatCurrencyWithDecimal(dataItems[key])}
                          </p>
                        </TableData>
                      );
                    } else if (
                      ["date", "createdOn", "updatedOn"].includes(key)
                    ) {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            "_",
                            dataItems[key],
                            headerList[key],
                            index,
                            "_td_table_data"
                          )}
                        >
                          <p className={`text-sm px-2`}>
                            {format(new Date(dataItems[key]), "LLLL")}
                          </p>
                        </TableData>
                      );
                    } else if (
                      ["status", "isActive"].includes(key)
                    ) {
                      return (
                        <TableData
                          className={tdClassName + " text-center"}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            "_",
                            dataItems[key],
                            headerList[key],
                            index,
                            "_td_table_data"
                          )}
                        >
                          <StatusBadge isActive={dataItems[key]} />
                        </TableData>
                      );
                    }
                    else {
                      return (
                        <TableData
                          className={tdClassName}
                          key={keyPrefix.concat(
                            String(dataItems[keyField]),
                            "_",
                            dataItems[key],
                            headerList[key],
                            index,
                            "_td_table_data"
                          )}
                        >
                          <p
                            className={`text-sm px-2 ${hasKeys(needsEmphasis)
                              ? dataItems[
                                needsEmphasis?.emphasisCheckField
                              ] === false
                                ? "font-bold"
                                : "font-default"
                              : "font-semibold"
                              }`}
                          >
                            {splitString(dataItems[key], "_")}
                          </p>
                        </TableData>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataList?.length > 0 && (
          <div
            className={
              dataList.length > 0 ? "flex justify-center mb-10" : "hidden"
            }
          >
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PageSize}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    );
  }, [dataList]);
  return <>{tableDiv}</>;
}
