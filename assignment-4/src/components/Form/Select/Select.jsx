import './Select.scss'

export default function Select({id, label, options, ...rest}) {
    return (
        <div className="select">
            <label
                htmlFor={id}
                className="select__label"
            >
                {label}
            </label>

            <select
                id={id}
                name={id}
                className='select__input'
                {...rest}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}