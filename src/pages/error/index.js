//Error
import { useRouteError, useNavigate } from 'react-router-dom';
import error from '../../assets/images/error.png';

export default function Error() {
    const errors = useRouteError();
    const errorMessage = errors?.message ?? '';
    let navigate = useNavigate();

    return (
        <div className="container">
            <div id="error-wrapper">
                <div id="error-container">
                    <div className="error-content">
                        <img src={error} />
                        <h1>PAGE NOT FOUND</h1>
                        <div className="space-20"></div>
                        <h4>{errorMessage}</h4>
                        <div className="space-30"></div>
                        <div onClick={() => navigate(`/admin/academy`)}>
                            <a className="btn btn-solid">Go to reload</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}