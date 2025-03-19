import './Form.scss'

export default function Form({children, action}) {
    return (
        <form className='form' action={action}>
            {children}
        </form>
    );
}