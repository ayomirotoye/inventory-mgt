import { AiFillFileAdd, AiOutlineDelete } from 'react-icons/ai';
import colors from 'tailwindcss/colors';
import { allowedExtensionArr, getBase64, isEmptyString, isNullOrUndefined } from '../../libs/helper';

export default function FileInput({ label,
    id,
    value,
    size = "md:w-1/2",
    onFileChange,
    onFileChangeError,
    fileName
}: any) {
    function triggerUpload() {
        document.getElementById(id)?.click();
    }

    async function changeFile(event: any) {
        let fileKey = event.target.id;

        let fileKeyName = `${fileKey}Name`;
        let file = event.target.files[0];
        let fileExt = file.name.split(".")[1];
        let extArr = allowedExtensionArr(fileKey);
        if (extArr.includes(fileExt.toLowerCase())) {
            const uploadRes = await getBase64(file)
                .then(result => {
                    file["base64"] = result;
                    const data = {
                        [fileKey]: result,
                        [fileName ?? fileKeyName]: event.target.files[0].name
                    }
                    return data;
                })
                .catch(err => {
                    console.log(err);
                });
            onFileChange(uploadRes);
        }
        else {
            onFileChangeError({ [fileKey]: `${"Uploaded file is not valid for this type. Allowed types are  ".concat(extArr.join(","))}` })
        }
    }


    const onDeleteFile = () => {
        const data = {
            [id]: "",
            [`${id}"Name"`]: ""
        }
        onFileChange(data);
    }

    return (
        <div className={`${size} w-full md:mb-0`}>
            <div className='font-bold mb-2 text-sm md:flex justify-between'>
                <div>{`Upload ${label} `}</div>
                <div>{isNullOrUndefined(value) || isEmptyString(value) ? "" :
                    <AiOutlineDelete className='cursor-pointer' onClick={onDeleteFile} fill={colors.red[900]} />}</div>
            </div>
            <div className={`w-full ${onFileChangeError[id]?.hasError ? 'border-2 border-red-900 rounded-lg'
                : onFileChangeError[id]?.message.length > 0 && !onFileChangeError[id]?.hasError && 'border-2 border-green-900 rounded-lg'}`}>
                <div className='border-4 rounded-lg flex flex-row-reverse justify-end '>
                    <input type="file" id={id} className='opacity-0' onChange={changeFile} />
                    <AiFillFileAdd className='cursor-pointer' size={50} onClick={triggerUpload} fill={colors.yellow[900]} />
                </div>
            </div>
        </div>
    )
}