import { useState } from "react";
import "./style.css"

export default function AutoComplete({
    widthClass = "w-80",
    handleClick,
    handleChange,
    placeholder = "Search ...",
    readOnly = false,
    suggestions,
    buttonText = "Search" }: any) {
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e: any) => {
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
            (suggestion: string) =>
                suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(e.currentTarget.value)
    };
    const onClick = (e: any) => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInput(e.currentTarget.innerText)
    };
    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) { // enter key
            setActive(0);
            setIsShow(false);
            setInput(filtered[active])
        }
        else if (e.keyCode === 38) { // up arrow
            return (active === 0) ? null : setActive(active - 1);
        }
        else if (e.keyCode === 40) { // down arrow
            return (active - 1 === filtered.length) ? null : setActive(active + 1);
        }
    };
    const renderAutocomplete = () => {
        if (isShow && input) {
            if (filtered.length) {
                return (
                    <ul className="autocomplete">
                        {filtered.map((suggestion, index) => {
                            let className;
                            if (index === active) {
                                className = "active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className="autocomplete">
                        <em>Not found</em>
                    </div>
                );
            }
        }
        return <></>;
    }

    return (
        <div className={`${widthClass}`}>
            <div className="flex items-center rounded-lg pr-2 bg-white">
                <div className='w-full'>
                    {!readOnly ?
                        <input
                            value={input}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            type="text"
                            className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                            placeholder={placeholder} /> :
                        <input
                            value={input}
                            readOnly={true}
                            type="text"
                            className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500"
                            placeholder={placeholder} />
                    }
                </div>

                <div>
                    <button onClick={handleClick} className='border-0 rounded-lg bg-primary-900 text-white cursor-pointer font-bold px-3 py-2 w-full'>{buttonText}</button>
                </div>
            </div>
            <div className="z-10000">
                {renderAutocomplete()}
            </div>
        </div>
    )
}