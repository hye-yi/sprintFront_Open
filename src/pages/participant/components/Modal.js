import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ApiRequest } from 'utils';
import { ModalTable } from './ModalTable';
import { Modal, Button } from 'components';
import moment from 'moment';

const modalTitle = '로그인 정보';
const BI_LOGIN_PAGE =
    'https://app.powerbi.com/singleSignOn?route=home&ru=https:%2f%2fapp.powerbi.com%2f%3froute%3dhome%26noSignUpCheck%3d1';
const BI_DOWNLOAD_PAGE = 'https://www.microsoft.com/ko-kr/download/details.aspx?id=58494';
const biModalTitle = (
    <>
        Cloud Sprint에 오신 것을 환영합니다! <br /> 코치의 안내에 따라 다음 화면으로 이동해 주세요.
    </>
);

/*
 * 교육 당일 예약 시간이 지나면 true & 스크립트 보여짐
 */
const checkTimetoPost = ({ reservationTime = `T00:00:00`, OpenStart }) => {
    const current = moment();
    let fullReservationTime = moment(`${OpenStart}T${reservationTime}`);
    const result = fullReservationTime.diff(current) < 0;
    return result;
};

export const PwModal = ({ props }) => {
    const { programId, userPrincipalName, userPassword, assignSubscriptionName, assignResourceGroup, academyId } =
        props;
    const [timeToPost, setTimeToPost] = useState(false);
    const dispatch = useDispatch();
    const request = new ApiRequest();

    const fetchData = async () => {
        const academy = await request.get(`/academy?academyId=${academyId}`);
        setTimeToPost(checkTimetoPost(academy[0]));
    };

    const clickMovePotal = () => {
        window.open('https://portal.azure.com');
        dispatch({ type: 'MODAL_CLOSE' });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Contents = () => {
        const tableData = [
            { head: '아이디', children: userPrincipalName },
            { head: '비밀번호', children: userPassword },
            { head: '할당받은 구독', children: assignSubscriptionName },
            { head: '할당받은 리소스 그룹', children: assignResourceGroup },
        ];
        if (timeToPost)
            tableData.push({
                head: '스크립트 다운로드',
                children: (
                    <Link download target="_blank">
                        <Button variant="outline">
                            <i className="icon-file-download mr-10" />
                            Script DownLoad
                        </Button>
                    </Link>
                ),
            });
        return (
            <div className="login-info">
                <ModalTable tableData={tableData} />
            </div>
        );
    };

    const BIContents = () => {
        const tableData = [
            {
                head: '로그인하기',
                children: (
                    <div className="modal-bi-text">
                        <Link to={BI_LOGIN_PAGE} target="_blank" className="ft-primary">
                            <i className="icon-people mr-10" />
                            Login Page
                        </Link>
                    </div>
                ),
            },
            {
                head: 'Desktop 다운로드',
                children: (
                    <div className="modal-bi-text">
                        <Link to={BI_DOWNLOAD_PAGE} target="_blank" className="ft-primary">
                            <i className="icon-file-download mr-10" />
                            Desktop DownLoad Page
                        </Link>
                    </div>
                ),
            },
        ];
        return (
            <div className="login-info">
                <ModalTable tableData={tableData} />
            </div>
        );
    };

    const BiFooter = (
        <div className="btn-wrap p-side-20 fm-group" style={{ justifyContent: 'space-between' }}>
            <div></div>
            <div>
                <Button variant={`outline`} children={'취소'} onClick={() => dispatch({ type: 'MODAL_CLOSE' })} />
                <Button variant={`solid`} children={'Azure Portal 바로가기'} onClick={() => clickMovePotal()} />
            </div>
            <div></div>
        </div>
    );

    return programId == '201' ? (
        <Modal id={'LoginInfo'} modalTitle={biModalTitle} contents={<BIContents />} width={`100%`} />
    ) : (
        <Modal id={'LoginInfo'} modalTitle={modalTitle} contents={<Contents />} width={`100%`} footer={BiFooter} />
    );
};
