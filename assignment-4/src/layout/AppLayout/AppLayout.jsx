import {Outlet} from 'react-router-dom';
import Header from "@/layout/Header/index.js";
import './AppLayout.scss';

function AppLayout() {

    return (
        <div className="app-layout grid-bleed">
            <Header/>

            <main className="app-layout__main">
                <Outlet/>
            </main>
        </div>
    );
}

export default AppLayout;