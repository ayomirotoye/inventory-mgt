import { isNullOrUndefined, isEmptyString } from '../../libs/helper';


let DeleteIcon = require("../../assets/icons/delete-icon.svg").default;
let BrowseFileIcon = require("../../assets/icons/browse.svg").default;

export default function FileInput({ label,
    onChange,
    id,
    value,
    size = "md:w-1/2",
    error,
    onDelete
}: any) {
    function triggerUpload() {
        document.getElementById(id)?.click();
    }

    return (
        <div className={`${size} w-full md:mb-0`}>
            <div className='font-bold mb-2 text-sm md:flex justify-between'>
                <div>{`Upload ${label} `}</div>
                <div>{isNullOrUndefined(value) || isEmptyString(value) ? "" :
                    <img onClick={onDelete} src={DeleteIcon} className="cursor-pointer" />}</div>
            </div>
            <div className={`w-full ${error[id]?.hasError ? 'border-2 border-red-900 rounded-lg'
                : error[id]?.message.length > 0 && !error[id]?.hasError && 'border-2 border-green-900 rounded-lg'}`}>
                <img className={'cursor-pointer w-full h-15'} src={BrowseFileIcon} alt=""
                    onClick={triggerUpload} />
            </div>
            <input type="file" id={id} className='opacity-0' onChange={onChange} />
        </div>
    )
}