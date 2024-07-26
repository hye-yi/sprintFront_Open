import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import ErrorBoundary from 'pages/error';
import AdminRouter from './adminRouter';
import {
    AuthenticatedTemplate, //로그인 성공
    UnauthenticatedTemplate, //로그인 실패
} from '@azure/msal-react';
import { ParticipantMain } from 'pages/participant/main';
import { Login } from 'pages/admin/login';

const Routers = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorBoundary />}>
            <Route path="/" element={<ParticipantMain />} />
            <Route
                path="admin/*"
                element={
                    <>
                        {/* <UnauthenticatedTemplate>
                            <Login />
                        </UnauthenticatedTemplate>
                        <AuthenticatedTemplate> */}
                        <AdminRouter />
                        {/* </AuthenticatedTemplate> */}
                    </>
                }
                //포트폴리오를 위해 주석처리
            />
        </Route>
    )
);

export default Routers;
