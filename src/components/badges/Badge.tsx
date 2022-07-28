
export default function Badge({ text, textSize = "text-sm text-green-800",
    bgColor = "bg-green-200 dark:bg-green-700 dark:text-green-300"
}: any) {
    return (
        <span className={`inline-flex items-center p-1 mr-2 ${textSize} ${bgColor} font-semibold rounded-lg`}>
            {text}
        </span>
    )
}