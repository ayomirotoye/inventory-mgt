export default function MenuIconBars({
    className = "w-6 h-6",
    fill = "currentColor",
    stroke = "currentColor"
}) {
    return (
        <svg className={className}
            fill="none"
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fill={fill}
                stroke={stroke}
                strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
    )
}