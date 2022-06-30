export const ChevronRightIcon = ({
    className,
    stroke = "#ffffff",
    height = "16",
    width = "16",
}: any) => {
    return (
        <svg className={className}
            fill="none"
            enableBackground={`new 0 0 ${width} ${height}`}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg">
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2} d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /></svg>
    )
}