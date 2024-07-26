import { useMsal } from '@azure/msal-react';
import logoImg from 'assets/images/logo.png';
import { loginRequest } from 'utils';
import { useDispatch } from 'react-redux';

const ADMINGROUPID = 'd343e780-4011-4813-919a-d84657080292';
export const Login = () => {
    const { instance } = useMsal();
    const dispatch = useDispatch();

    function ClickHandler(event) {
        event.preventDefault();
        const result = Promise.resolve(instance.loginPopup(loginRequest));
        result.then((res) => {
            const isGroupMember = res.account.idTokenClaims.groups?.includes(ADMINGROUPID);

            //group에 있으면 true, 없으면 undefined
            if (!isGroupMember)
                instance.logoutRedirect({
                    postLogoutRedirectUri: '/',
                    mainWindowRedirectUri: '/',
                });
            else dispatch({ type: 'USER', name: res.account.name });
        });
    }

    return (
        <>
            <div className="bg-index" style={{ zIndex: -1 }}></div>
            <div id="login-wrapper">
                <div id="login-container">
                    <div className="login-wrap-form">
                        <div className="inner">
                            <div className="login-title-wrap">
                                <h1 className="login-logo">
                                    <img src={logoImg} alt="로고" />
                                </h1>
                                <p className="align-center">
                                    <b>Welcome to Cloud Sprint Manager</b>
                                    <br />
                                    One-Day 클라우드 교육 프로그램
                                </p>
                            </div>
                            <div className="space-30"></div>
                            <div className="space-10"></div>
                            <button className="btn-login btn-ghost" onClick={ClickHandler}>
                                Microsoft 계정으로 로그인
                            </button>
                            <div className="space-40"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
