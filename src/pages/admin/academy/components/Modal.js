import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Snackbar, ErrorMessage, Button, Modal } from 'components'
import { ApiRequest } from 'utils';
import makeTableVar from '../variables/ModalTableVar';

export const AcademyModal = ({ props }) => {
    const request = new ApiRequest;
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();
    const { academyId, participantId } = props;
    const dispatch = useDispatch();
    const INPUT_TABLE = makeTableVar();
    const [snackbar, setSnackbar] = useState({ message: '' });

    const closeModal = (message) => {
        setSnackbar({ message, severity: 'info' });
        setTimeout(() => dispatch({ type: 'MODAL_CLOSE' }), 700);
    };

    const editBtnClick = async (data) => {
        request.put(`/participant`, { ...data, academyId, participantId })
            .then(() => closeModal('수정이 완료되었습니다.'))
            .catch(({ response }) => {
                const { error } = response.data;
                error.code == 1
                    ? setSnackbar({ message: '이미 등록된 email입니다.' })
                    : setSnackbar({ message: '할당된 교육생의 email은 수정할 수 없습니다.' });
            });
    };

    const deleteBtnClick = async () => {
        request.delete(`/participant`, { participantId })
            .then(() => closeModal('삭제 완료되었습니다.'))
            .catch(() => setSnackbar({ message: '삭제 불가능합니다.' }));
    };

    const clickEvent = (event) => () => handleSubmit(event)();

    const Content =
        <div className="tbl-wrap bdr bdr-gray">
            <table className="tbl tbl-singleline" width="100%">
                <colgroup>
                    {INPUT_TABLE.map((_, i) => (
                        <col key={i} wdith="" />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {INPUT_TABLE.map((item, i) => (
                            <th key={i}>
                                {item.head}
                                <em className="essential">{item.required ? ` *` : ``}</em>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {INPUT_TABLE.map((item, i) => (
                            <td key={i}>
                                <input
                                    className="fm-control w-100"
                                    {...register(item.name, {
                                        value: props[item.name] ?? '',
                                        ...item,
                                    })}
                                />
                                {errors[item.name] && <ErrorMessage message={errors[item.name]?.message} />}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <Snackbar props={snackbar} />
        </div>

    const Footer =
        <div className="btn-wrap p-side-20 fm-group" style={{ justifyContent: 'space-between' }}>
            <div>
                <Button variant={`outline-warn`} children={'삭제'} onClick={clickEvent(deleteBtnClick)} />
            </div>
            <div>
            </div>
            <div>
                <Button variant={`outline`} children={'취소'} onClick={() => dispatch({ type: 'MODAL_CLOSE' })} />
                <Button variant={`solid`} children={'수정'} onClick={clickEvent(editBtnClick)} />
            </div>
        </div>

    return <Modal
        id={'AddProgram'}
        modalTitle={'교육생 수정'}
        contents={Content}
        footer={Footer}
    />
};
