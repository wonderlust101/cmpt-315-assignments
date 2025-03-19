import './TextInput.scss'

export default function TextInput({id, label, onChange, value, ...rest}) {
    return (
        <div className="text-input">
            <label
                htmlFor={id}
                className="text-input__label"
            >
                Email Address:
            </label>
            <input
                id={id}
                name={id}
                className="text-input__input"
                {...rest}
            />
        </div>
    );
}