export default function FormGroup({
    formLabel,
    onChange,
    type = "text",
    placeholder = "",
    className = 'w-2/3',
    value = "",
    name = "",
    readOnly = false,
    showLabel = true
}: any) {
    return (
        <div className={className}>
            {showLabel && <div className=' flex justify-start mb-3 text-sm font-bold'>{formLabel}</div>}
            <div>
                {readOnly ? <input
                    readOnly={readOnly}
                    id={name}
                    name={name}
                    type={type}
                    className={`${className}' bg-white font-semibold w-full focus:outline-none px-3 py-4 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500'`}
                    value={String(value)}
                    placeholder={placeholder}
                /> : <input
                    id={name}
                    name={name}
                    type={type}
                    className={`${className}' bg-white font-semibold w-full focus:outline-none px-3 py-4 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500'`}
                    onChange={onChange}
                    value={type === "number" ? value > 0 ? String(value).startsWith("0") ? value.substring(1) : value : 0 : value}
                    placeholder={placeholder}
                />}
            </div>
        </div>
    )
}