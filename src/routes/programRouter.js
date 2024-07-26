import { Route, Routes } from 'react-router-dom';
import { Program } from 'pages/admin/program';
import { Academy } from 'pages/admin/academy';

export const ProgramRouter = () => {
    return (
        <Routes>
            <Route path="" element={<Program />} />
            <Route path="academy" element={<Academy />} />
        </Routes>
    );
};
