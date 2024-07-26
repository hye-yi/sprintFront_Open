const INPUT_TABLE = (props) => {
    const { title, programId } = props;
    const result = [
        {
            head: '교육명',
            required: '값이 비워져 있으면 안 됩니다.',
            name: 'title',
            disabled: true,
            value: title,
        },
        { head: '시작 일자', required: '값이 비워져 있으면 안 됩니다.', type: 'date', name: 'OpenStart' },
        { head: '강사', name: 'instructor' },
        { head: '장소', name: 'location' },
    ];
    if (programId == '101') result.push({
        head: '예약시간',
        type: 'time',
        name: 'reservationTime',
    })
    return result
}

export default INPUT_TABLE;


