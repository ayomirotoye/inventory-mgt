import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PrimaryButton from '../buttons/PrimaryButton';
import ViewText from '../texts/view-text';
import { isNullOrUndefined } from '../../libs/helper';


let CloseIcon = require('../../assets/icons/close.svg').default;

function DialogModal({
    isModalVisible,
    onClosed,
    children,
    modalTitle,
    showFooter = false,
    overlayBg = "bg-gray-500 bg-opacity-75",
    size = "md:w-1/3",
    showFooterComponent = null
}: any) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={isModalVisible} as={Fragment}>
            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center justify-center"></div>
                <Dialog
                    as="div"
                    className="fixed z-[100] inset-0 overflow-y-auto mx-2"
                    initialFocus={cancelButtonRef}
                    onClose={onClosed}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                onClick={onClosed}
                                className={"fixed inset-0 ".concat(overlayBg, " transition-opacity")} />
                        </Transition.Child>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" ref={cancelButtonRef}>
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className={"inline-block align-center bg-white rounded-lg border-primary-900 border-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ".concat(size, " w-full md:w-1/2 ")}>
                                <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4 mx-6 mb-4">
                                    <div className='flex justify-between border-b'>
                                        <ViewText textValue={modalTitle} size={"text-md"} />
                                        <div onClick={onClosed}>
                                            <span className="" aria-hidden="true">
                                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="sm:flex-none sm:items-start">
                                        <div className="mt-3 sm:mt-0 sm:text-left">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                {showFooter &&
                                    < div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mx-4">
                                        {isNullOrUndefined(showFooterComponent) ?
                                            <PrimaryButton
                                                buttonText='Close'
                                                onClicked={onClosed}
                                                extraDivStyles={"w-1/4"}
                                            /> : showFooterComponent}
                                    </div>
                                }
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </div >
        </Transition.Root >
    )
}

export default DialogModal;