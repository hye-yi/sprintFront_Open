export const TopInfo = ({ props }) => {
    const { title = '', academyTotalCnt = 0, totalParticipantCnt = 0, maxParticipantsPerAcademy = 0 } = props

    return (
        <div className="top-container">
            <div className="top-title">
                <div className="breadcrumb">
                    <span className="item">프로그램 관리</span>
                    <span className="bc-divider">{`>`}</span>
                    <span className="item">{title}</span>
                </div>
                <div className="title">{title}</div>
            </div>
            <div className="top-info">
                <div className="item section-divider">
                    <div className="title">누적 교육 횟수</div>
                    <span>{academyTotalCnt}</span>
                </div>
                <div className="item section-divider">
                    <div className="title">누적 참석자</div>
                    <span>{totalParticipantCnt}</span>
                </div>

                <div className="item section-divider">
                    <div className="title">차수당 최대 수용 인원</div>
                    <span>{maxParticipantsPerAcademy}</span>
                </div>
            </div>
        </div>
    )
}