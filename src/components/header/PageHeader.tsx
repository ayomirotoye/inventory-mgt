export default function PageHeader({ title, description }: any) {
    return (
        <>
            <div className="text-3xl mb-3">
                <span className="font-bold text-primary-900">{title}</span>
            </div>

            <div className="text-sm font-bold mb-11">
                {description}
            </div>
        </>
    )
}