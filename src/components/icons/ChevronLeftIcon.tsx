export const ChevronLeftIcon = ({
    className,
    stroke = "#ffffff",
    height = "32",
    width = "32",
    onClick
}: any) => {
    return (
        onClick ? <svg
            onClick={onClick}
            className={className}
            fill="none"
            enableBackground={`new 0 0 ${width} ${height}`}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg">
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={6} d="M20 30 L8 16 20 2" /></svg> :
            <svg
                className={className}
                fill="none"
                enableBackground={`new 0 0 ${width} ${height}`}
                viewBox={`0 0 ${width} ${height}`}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={6} d="M20 30 L8 16 20 2" /></svg>

    )
}