import { checkEmail } from 'utils';

const INPUT_TABLE = () => {
    return [
        { head: '이름', required: '값이 비워져 있으면 안 됩니다.', name: 'fullName' },
        {
            head: 'email',
            required: '값이 비워져 있으면 안 됩니다.',
            name: 'email',
            validate: { notEmail: (data) => (checkEmail(data) ? true : '잘못된 이메일 형식입니다.') },
        },
        { head: '연락처', name: 'phoneNumber' },
        { head: '회사', name: 'companyName' },
    ];
};

export default INPUT_TABLE;
