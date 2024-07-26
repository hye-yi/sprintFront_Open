import { Button } from './Button';

const Table = (props) => {
    const { title, head, tableData, addBtn } = props;
    return (
        <>
            {title ? (
                <div className="page-heading">
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {addBtn ?? <></>}
            <div className="tbl-wrap">
                <table className="tbl tbl-singleline" width="100%">
                    <colgroup>
                        {head?.map(({ width }, i) => (
                            <col key={i} width={width} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {head?.map(({ title, align }, i) => (
                                <th key={i} style={{ textAlign: align }}>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((row, i) => (
                            <tr key={i}>
                                {head?.map(({ key, align }, i) => (
                                    <td key={i} style={{ textAlign: align }}>
                                        {row[key] ?? ``}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export const ProgramTopTable = (props) => {
    const { data } = props;

    const head = [
        { title: '프로그램 명', key: 'title', width: '25%' },
        { title: '누적 교육 횟수', key: 'academyTotalCnt', width: '25%' },
        { title: '누적 참석자', key: 'totalParticipantCnt', width: '25%' },
        { title: '차수당 최대 수용 인원', key: 'maxParticipantsPerAcademy', width: '25%' },
    ];
    return Table({ head, tableData: data, title: '프로그램' });
};

export const ProgramListTable = (props) => {
    const { data, onBtnClick } = props;

    const head = [
        { title: '차수', key: 'no', width: '5%', align: 'center' },
        { title: '시작 일자', key: 'OpenStart', width: '' },
        { title: '강사명', key: 'instructor', width: '' },
        { title: '장소', key: 'location', width: '' },
        { title: '교육생 수', key: 'participantCnt', width: '10%', align: 'center' },
        { title: '상태', key: 'status', width: '8%', align: 'center' },
        { title: '교육생 확인', key: 'moveParticipant', width: '10%', align: 'center' },
        { title: '수정', key: 'editAcademy', width: '7%', align: 'center' },
    ];
    return Table({ head, tableData: data, addBtn: AddBtn('교육추가', onBtnClick) });
};

export const AcademyListTable = (props) => {
    const { data } = props;

    const head = [
        { title: 'No', key: 'no', width: '', align: 'center' },
        { title: '이름', key: 'fullName', width: '' },
        { title: 'email', key: 'email', width: '' },
        { title: '연락처', key: 'phoneNumber', width: '' },
        { title: '회사', key: 'companyName', width: '' },
        { title: '로그인ID', key: 'userPrincipalId', width: '' },
        { title: '', key: 'assignParticipant', width: '' },
        { title: '수정', key: 'editParticipant', width: '', align: 'center' },
    ];
    return Table({ head, tableData: data });
};

const AddBtn = (text, onBtnClick) => {
    return (
        <div className="dp-flex mb-10">
            <div className="ml-auto">
                <div className="btn-wrap">
                    <Button size={'medium'} onClick={onBtnClick}>
                        {text}
                    </Button>
                </div>
            </div>
        </div>
    );
};
