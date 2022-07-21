export default function SearchInput({ widthClass = "w-80",
    handleClick,
    searchQuery,
    onChangeInput,
    placeholder = "Search ...",
    readOnly = false,
    isSearching = false,
    name = "searchVal",
    buttonText = "Search" }: any) {

    return (
        <div className={`${widthClass}`}>
            <div className="flex items-center rounded-lg pr-2 bg-white">
                <div className='w-full'>
                    {!readOnly ? <input value={searchQuery}
                        onChange={onChangeInput}
                        type="text"
                        name={name}
                        className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                        placeholder={placeholder} /> :
                        <input value={searchQuery}
                            readOnly={true}
                            type="text"
                            className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                            placeholder={placeholder} />
                    }
                </div>

                <div>
                    <button onClick={handleClick} className='border-0 rounded-lg bg-primary-900 text-white cursor-pointer font-bold px-3 py-2 w-full'>
                        {isSearching ? <>searching</> : buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}