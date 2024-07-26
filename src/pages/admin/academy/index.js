import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchData } from './loader';
import { AddAcademy } from './components/AddAcademy';
import { ParticipantList } from './components/ParticipantList';
export const Academy = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [renderCount, setRenderCount] = useState(0);
    const { isOpen } = useSelector((state) => state.modal);

    const academyId = searchParams.get('academyId');
    const programId = searchParams.get('programId') || '101';

    const handleRendering = () => {
        let temp = renderCount;
        temp++;
        setRenderCount(temp);
    };

    useEffect(() => {
        fetchData(academyId).then(async (data) => {
            const { participantList } = data;
            const { status } = data.academyInfo[0];
            setData({ participantList, academyId, status });
        });
    }, [, academyId, isOpen, renderCount]);
    return (
        <div id="contents" role="admin">
            <div className="page-inner">
                <div className="back-to-container">
                    <Link to={`/admin/program?programId=${programId}`} className="back-to">
                        <i className="icon-chevron-left" style={{ fontSize: '13px' }} />
                        <span>프로그램 목록으로</span>
                    </Link>
                </div>
                <AddAcademy props={{ programId, academyId, status: data.status }} rerendering={handleRendering} />
                {programId !== '201' ?
                    <ul className="descriptions">
                        <li>
                            <span>- 교육에서 사용된 리소스들이 지워지는데 10분 정도 소요될 수 있습니다.</span>
                        </li>
                        <li>
                            <span>- 해지 후 포탈에서 리소스가 전부 정리됐는지 확인 필수입니다.</span>
                        </li>
                    </ul>
                    : <></>}
                <ParticipantList props={data} rerendering={handleRendering} />
            </div>
        </div>
    );
};
