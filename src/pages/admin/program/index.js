import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TopInfo } from './components/TopInfo';
import { fetchData } from './loader';
import { AcademyList } from './components/AcademyList';

export const Program = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [topData, setTopData] = useState([]);
    const [renderCount, setRenderCount] = useState(0);

    const { isOpen } = useSelector((state) => state.modal);

    const programId = searchParams.get('programId') || '101';

    const handleRendering = () => {
        let temp = renderCount;
        temp++;
        setRenderCount(temp);
    };

    useEffect(() => {
        fetchData(programId).then(async (data) => {
            const { programInfo, academyList } = data;
            setData({ academyList, ...programInfo });
            setTopData(programInfo);
        });
    }, [, programId, isOpen, renderCount]);

    return (
        <div id="contents" role="admin">
            <div className="page-inner">
                <TopInfo props={topData} />
                <AcademyList props={data} rerendering={handleRendering} />
            </div>
        </div>
    );
};
