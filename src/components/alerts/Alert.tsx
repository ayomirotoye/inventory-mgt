import { BsCheckLg } from "react-icons/bs"
import { MdOutlineDangerous } from "react-icons/md"
import colors from "tailwindcss/colors"

export default function Alert({ message, type = "success", t }: any) {

    return (
        <div className={`bg-white px-10 py-3 shadow-md border-4 ${type==="success"? "border-green-900": "border-red-900"} rounded-md ${t.visible ? 'animate-enter' : 'animate-leave'}`}
        >
            <div className="flex justify-between items-center space-x-2">
                <>
                    {type === "success" ? <BsCheckLg className="h-5 w-5"
                        fill={colors.green[900]}
                        stroke={colors.green[900]} /> :
                        <MdOutlineDangerous className="h-10 w-10 mt-3"
                        fill={colors.red[900]}
                        stroke={colors.red[900]}
                        />}
                    <div>
                        {message}
                    </div>
                </>
            </div>
        </div>
    )
}