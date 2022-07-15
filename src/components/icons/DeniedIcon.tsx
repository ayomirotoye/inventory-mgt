
export const DeniedIcon = ({
    height = "329.328",
    width = "329.328",
    className = "icons-svg",
    strokeWidth = "2",
    fill = "none",
    onClick
}: any) => {
    return (
        <svg
            onClick={onClick}
            className={className}
            height={height}
            strokeWidth={strokeWidth}
            width={width}
            fill={fill}
            id="denied-icon"
            enableBackground={`new 0 0 ${width} ${height}`}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M164.666,0C73.871,0,0.004,73.871,0.004,164.672c0.009,90.792,73.876,164.656,164.662,164.656
	c90.793,0,164.658-73.865,164.658-164.658C329.324,73.871,255.459,0,164.666,0z M164.666,30c31.734,0,60.933,11.042,83.975,29.477
	L59.478,248.638c-18.431-23.04-29.471-52.237-29.474-83.967C30.004,90.413,90.413,30,164.666,30z M164.666,299.328
	c-31.733,0-60.934-11.042-83.977-29.477L269.854,80.691c18.431,23.043,29.471,52.244,29.471,83.979
	C299.324,238.921,238.917,299.328,164.666,299.328z"/>
        </svg>
    )
}