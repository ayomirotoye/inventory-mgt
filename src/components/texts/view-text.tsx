const ViewText = ({ size = "text-sm", textValue, color = "text-color-2" }: any) => {
    return (
        <div className={size.concat(` font-bold ${color} mb-30`)}>
            {textValue}
        </div>
    )
}

export default ViewText;