import './Container.scss'

export default function Container({children}) {
    return (
        <div className="container">
            {children}
        </div>
    );
}