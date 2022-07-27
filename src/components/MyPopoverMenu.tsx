import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Arrow, useLayer } from "react-laag";
import { Link } from "react-router-dom";
import { hasKeys, isNullOrUndefined } from "../libs/helper";
import MenuIconBars from "./icons/MenuIconBars";

export default function MyPopoverMenu({
    panelClassName = "p-5 bg-secondary-200",
    listItems,
    panelWidth = "w-28",
    showTriggerComponent,
    elementClassName="m-5 bg-primary-900 p-3 rounded-lg"
}: any) {
    const [isOpen, setOpen] = useState(false);

    // helper function to close the menu
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close, // close the menu when the user clicks outside
        onDisappear: close, // close the menu when the menu gets scrolled out of sight
        overflowContainer: true, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: "bottom-center", // we prefer to place the menu "top-end"
        triggerOffset: 12, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
        arrowOffset: 16, // let the arrow have some room to breath also
    });

    // Again, we're using framer-motion for the transition effect
    return (
        <>
            <button {...triggerProps} onClick={() => setOpen(!isOpen)} className={elementClassName}>
                {isOpen ? showTriggerComponent.whenOpen : showTriggerComponent.whenHidden}
            </button>
            {renderLayer(
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul {...layerProps}
                            className={` ${panelWidth} ${panelClassName} rounded-lg cursor-pointer`}>
                            {listItems.map((item: any, index: number) => (
                                !isNullOrUndefined(item) ? <React.Fragment key={`popoverlist_${index}`}>
                                    {isNullOrUndefined(item.onClick) ?
                                        <Link to={item.link}>
                                            <div className="flex justify-start cursor-pointer my-2 px-2 py-2 listItem w-full">
                                                {hasKeys(item.hasIcon) ? <div className="text-left mr-2">{item.hasIcon.icon}</div> :
                                                    <MenuIconBars
                                                        fill='black'
                                                        stroke='black'
                                                        className='h-5 w-5' />
                                                }
                                                <div className="font-semibold truncate text-[12px]">{item.title}</div>
                                            </div>
                                        </Link> :
                                        <button
                                            id={"item_".concat("" + index, "_", item.name)}
                                            data-itemdata={!isNullOrUndefined(item.data) ? JSON.stringify(item.data) : ""}
                                            onClick={item.onClick}
                                            className="flex justify-start cursor-pointer my-2 px-2 py-2 items-center listItem w-full">
                                            {hasKeys(item.hasIcon ?? {}) && <div className="text-left mr-2">{item.hasIcon.icon}</div>}
                                            <span className="font-semibold truncate text-[12px]">{item.name}</span>
                                        </button>}
                                </React.Fragment> : []
                            ))}
                            <Arrow {...arrowProps} />
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}