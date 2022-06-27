import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function MyPopover({ showAs, listItems }: any) {

    return (
        <Popover className="relative -ml-5 md:-ml-0 mr-0">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`${open ? '' : 'text-opacity-90'} rounded-md focus:outline-none active:outline-none`}
                    >
                        {showAs}
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
                        <Popover.Panel className="absolute z-10 mt-3 -translate-x-3/4 transform px-4 sm:px-0 w-56">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-5 bg-white">
                                    {listItems.map((item: any, index: number) => (
                                        <React.Fragment key={`popoverlist_${index}`}>
                                            <Link to={item.href} >
                                                <div className="flex justify-start cursor-pointer my-2">
                                                    <div className="text-left mr-2">{item.icon}</div>
                                                    <div className="font-semibold truncate">{item.name}</div>
                                                </div>
                                            </Link>
                                        </React.Fragment>
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