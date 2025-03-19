import './DateSelect.scss'

export default function DateSelect({id, label, ...rest}) {
    return (
        <div className="date-select">
            <label
                htmlFor={id}
                className="date-select__label"
            >
                {label}
            </label>

            <input
                type="date"
                id={id}
                name={id}
                className='date-select__input'
                {...rest}/>
        </div>
    );
}