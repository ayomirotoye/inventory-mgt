

export default function CustomSelect({
    arrOfOptions,
    onChange,
    value,
    className = "",
    labelTitle,
    labelClassName = "flex justify-start mb-3 text-sm font-bold",
    labelField,
    valueField,
}: any) {

    return (
        <div className={className} key={labelTitle}>
            <div className={labelClassName}>{labelTitle}</div>
            <select onChange={onChange}
                value={value}
                className={`flex justify-between font-semibold items-center border-primary-900 border-2 px-3 rounded-lg cursor-pointer w-full py-3 px-3`}>
                <option value="">-- Choose one --</option>
                {arrOfOptions.map((items: any) => {
                    return <option value={items[valueField]}>{items[labelField]}</option>
                })}
            </select>
        </div>
    )
}