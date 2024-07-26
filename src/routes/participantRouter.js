import { Route, Routes } from 'react-router-dom';
import { ParticipantMain } from 'pages/participant/main';

const ParticipantRouter = () => {
    return (
        <Routes>
            <Route path="" element={<ParticipantMain />} />
        </Routes>
    );
};

export default ParticipantRouter;
