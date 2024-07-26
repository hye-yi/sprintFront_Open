import { ApiRequest } from 'utils';

export const fetchData = async (programId) => {
    const request = new ApiRequest
    const programInfo = await request.get(`/program?programId=${programId}`).then((res) => res[0]);
    const academyList = await request.get(`/academy?programId=${programId}`);

    if (programInfo.maxParticipantsPerAcademy == -1) programInfo.maxParticipantsPerAcademy = '제한 없음';

    programInfo.academyTotalCnt = academyList.length;
    programInfo.totalParticipantCnt = calculateParticipants(academyList);
    return { programInfo, academyList };
};

const calculateParticipants = (list) => {
    let sum = 0;
    list.forEach(({ participantCnt }) => (sum += participantCnt));
    return sum;
};
