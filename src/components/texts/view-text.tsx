const ViewText = ({ size = 16, textValue }:any) => {
    let textClass = "text-".concat(String(size));
    return (
        <div className={textClass.concat(" font-bold text-color-2 mb-30")}>
            {textValue}
        </div>
    )
}

export default ViewText;