export const ChevronDownIcon = ({
    className,
    stroke = "#ffffff"
}: any) => {
    return (
        <svg className={className}
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