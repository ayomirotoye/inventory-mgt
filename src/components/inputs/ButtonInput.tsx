export default function ButtonInput({
    handleClick, searchQuery,
    handleChange,
    placeholder = "Search ...",
    readOnly = false,
    buttonText = "Search",
    buttonBg = "bg-green-900"
}: any) {
    return (
        <div className='w-full border rounded px-1 py-1'>
            <div className="flex items-center rounded-lg pr-2 bg-white">
                <div className='w-full'>
                    {!readOnly ? <input value={searchQuery}
                        onChange={handleChange}
                        type="text"
                        className="mr-10 bg-white text w-full font-semibold focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                        placeholder={placeholder} /> :
                        <input value={searchQuery}
                            readOnly={true}
                            type="text"
                            className="mr-10 bg-white text w-full font-semibold focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                            placeholder={placeholder} />
                    }
                </div>

                <div>
                    <button onClick={handleClick} className={`border-0 rounded-lg ${buttonBg} text-white cursor-pointer font-bold px-3 py-2 w-full`}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}