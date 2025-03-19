import {Link, useLocation} from "react-router-dom";
import './Header.scss'

const links = [
    {href: '/', title: 'Product List'},
    {href: '/order-list', title: 'Order List'},
]


export default function Header() {
    const location = useLocation();

    return (
        <header className="header grid-bleed">
            <nav className="header__nav">
                <Link className='header__logo' to='/'>CompanyName</Link>

                <ul className="header__list">
                    {links.map(link => (
                        <li key={link.href}>
                            <Link
                                to={link.href}
                                className={location.pathname === link.href ? 'active' : ''}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}