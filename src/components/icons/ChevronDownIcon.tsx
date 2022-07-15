export const ChevronDownIcon = ({
    className,
    stroke = "#ffffff",
    onClick
}: any) => {
    return (
        onClick ? <svg
            onClick={onClick}
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            :
            <svg
                className={className}
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    )
}