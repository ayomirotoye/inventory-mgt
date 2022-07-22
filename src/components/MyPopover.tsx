import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { hasKeys, isNullOrUndefined } from "../libs/helper";

export default function MyPopover({
    showContent,
    showAs = "button",
    panelClassName = "p-5 bg-white",
    listItems,
    panelWidth = "w-56"
}: any) {

    return (
        <Popover className="relative -ml-5 md:-ml-0 mr-0">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`${open ? '' : 'text-opacity-90'} rounded-md focus:outline-none active:outline-none`}
                        as={showAs}
                    >
                        {showContent}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className={`absolute z-[100000] mt-3 ${panelWidth} -translate-x-3/4 transform px-4 sm:px-0`}>
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className={panelClassName}>
                                    {listItems.map((item: any, index: number) => (
                                        !isNullOrUndefined(item) ? <React.Fragment key={`popoverlist_${index}`}>
                                            {isNullOrUndefined(item.onClick) ?
                                                <Link to={item.href}>
                                                    <div className="flex justify-start cursor-pointer my-2">
                                                        <div className="text-left mr-2">{item.icon}</div>
                                                        <div className="font-semibold truncate text-[12px]">{item.name}</div>
                                                    </div>
                                                </Link> :
                                                <button id={"item_".concat("" + index, "_", item.name)} data-itemdata={!isNullOrUndefined(item.data) ? JSON.stringify(item.data) : ""} onClick={item.onClick} className="flex justify-start cursor-pointer my-2 items-center">
                                                    {hasKeys(item.hasIcon ?? {}) && <div className="text-left mr-2">{item.hasIcon.icon}</div>}
                                                    <span className="font-semibold truncate text-[12px]">{item.name}</span>
                                                </button>}
                                        </React.Fragment> : []
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}