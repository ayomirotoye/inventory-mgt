export const ProductIcon = ({
    height = "24",
    width = "24",
    className = "icons-svg",
    strokeWidth = "1",
    stroke = "currentColor",
    fill = "black",
    onClick
}: any) => {
    return (
        <svg
            onClick={onClick}
            className={className}
            x="0px"
            y="0px"
            height={height}
            strokeWidth={strokeWidth}
            width={width}
            fill={fill}
            stroke={stroke}
            // enableBackground="new 0 0 452.949 452.949"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="0" fill="none" width="24" height="24" />
            <g>
                <path d="M22 3H2v6h1v11c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V9h1V3zM4 5h16v2H4V5zm15 15H5V9h14v11zM9 11h6c0 1.105-.895 2-2 2h-2c-1.105 0-2-.895-2-2z" />
            </g>
        </svg>
    )
}