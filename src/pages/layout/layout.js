import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export const Layout = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
};
