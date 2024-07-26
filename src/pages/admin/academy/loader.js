import { ApiRequest } from 'utils';

export const fetchData = async (academyId) => {
    const request = new ApiRequest;
    const academyInfo = await request.get(`/academy?academyId=${academyId}`);
    const participantList = await request.get(`/participant?academyId=${academyId}`);

    return { academyInfo, participantList };
};
