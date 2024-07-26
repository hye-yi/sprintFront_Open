import { Route, Routes } from 'react-router-dom';
import { Login } from 'pages/admin/login';
import { Layout } from 'pages/layout/layout';
import { ProgramRouter } from './programRouter';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<Layout />}>
                <Route path="program/*" element={<ProgramRouter />} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;
