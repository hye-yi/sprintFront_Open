import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiRequest } from 'utils';
import { Button, ErrorMessage, Snackbar } from 'components';
import makeTableVar from '../variables/ModalTableVar';


export const AddAcademy = ({ props, rerendering }) => {
    const request = new ApiRequest;
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm();
    const { programId, academyId, status } = props;

    const INPUT_TABLE = makeTableVar(programId);
    const [snackbar, setSnackbar] = useState({ message: '' });

    const addBtnClick = async (data) => {
        if (status == 'closed') setSnackbar({ message: '교육이 마감되어 교육생을 추가할 수 없습니다.' });
        else {
            const insertData = { ...data, programId, academyId };
            request.post(`/participant`, insertData)
                .then(() => {
                    rerendering();
                    reset();
                })
                .catch(({ response }) => {
                    const { error } = response.data;
                    error.code == 1
                        ? setSnackbar({ message: '이미 등록된 교육생입니다.', trigger: new Date() })
                        : setSnackbar({ message: '더 이상 교육생을 추가할 수 없습니다.', trigger: new Date() });
                });
        }
    };

    return (
        <div className="top-card-wrap">
            <div className="top-card">
                <div className="title">교육생 추가</div>
                <div className="body">
                    {INPUT_TABLE.map((item, i) => (
                        <div className="input-box" key={i}>
                            <div className="input-title">
                                {' '}
                                {item.head}
                                <em className="essential">{item.required ? ` *` : ``}</em>
                            </div>
                            <div id="error-wrapper">
                                <input
                                    className="input-feild"
                                    {...register(item.name, {
                                        value: props[item.name] ?? '',
                                        ...item,
                                    })}
                                />
                                {errors[item.name] && <ErrorMessage message={errors[item.name]?.message} />}
                            </div>
                        </div>
                    ))}
                    <div className="mb-5">
                        <Button variant={'add'} onClick={() => handleSubmit(addBtnClick)()}>
                            추가
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar props={snackbar} />
        </div>
    );
};
