import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import logo from 'assets/images/admin_logo.png';

export const Header = () => {
    let navigate = useNavigate();
    const { instance } = useMsal();
    const user = useSelector((state) => state.user);
    const [toggleName, setToggleName] = useState(false);

    return (
        <header>
            <div id="gnb">
                <div className="left">
                    <a className="logo" onClick={() => navigate(`/`)}>
                        <img src={logo} alt="" />
                    </a>
                </div>
                <div className="right">
                    <div className="btn-gnb">
                        <ul className="dropdowns-link">
                            <li className="dropdown">
                                <div className="dropdown-inner">
                                    <a onClick={() => setToggleName(!toggleName)} data-toggle="dropdown">
                                        <span>
                                            안녕하세요. <b className="user-name">{user.name}</b>님
                                        </span>
                                        <i className="icon-arrow-drop-down dropdown-arrow" />
                                    </a>
                                    {toggleName ? (
                                        <ul className="dropdown-menu">
                                            <li>
                                                <div className="padding align-center">
                                                    <a
                                                        onClick={() => {
                                                            instance.logoutPopup({
                                                                postLogoutRedirectUri: '/',
                                                                // mainWindowRedirectUri: "/",
                                                            });
                                                        }}
                                                        className="btn btn-outline w-100"
                                                    >
                                                        로그아웃
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};
