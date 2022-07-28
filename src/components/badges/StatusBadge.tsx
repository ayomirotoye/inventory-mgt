import { AiOutlineCheck, AiOutlineWarning } from "react-icons/ai";

export default function StatusBadge({ isActive }: any) {
    return (
        isActive ?
            <span className="inline-flex items-center p-1 mr-2 text-sm font-semibold text-green-800 bg-green-200 rounded-full dark:bg-green-700 dark:text-green-300">
                <AiOutlineCheck />
            </span> :
            <span className="inline-flex items-center p-1 mr-2 text-sm font-semibold text-red-800 bg-red-200 rounded-full dark:bg-red-700 dark:text-red-300">
                <AiOutlineWarning />
            </span>
    )
}