const ViewText = ({ size = "text-sm", textValue, color = "text-color-2", className="" }: any) => {
    return (
        <div className={size.concat(` font-bold ${color} mb-30 ${className}`)}>
            {textValue}
        </div>
    )
}

export default ViewText;