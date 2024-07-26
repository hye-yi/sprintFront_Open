import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Snackbar, Button, ErrorMessage, Modal } from 'components';
import { ApiRequest } from 'utils';
import makeTableVar from '../variables/ModalTableVar';

export const ProgramModal = ({ props }) => {
    const request = new ApiRequest;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const { mode, title, programId, academyId, status } = props;
    const dispatch = useDispatch();
    const INPUT_TABLE = makeTableVar({ title, programId });
    const closeModal = (message) => {
        setSnackbar({ message, severity: 'info' });
        setTimeout(() => dispatch({ type: 'MODAL_CLOSE' }), 700);
    };
    const [snackbar, setSnackbar] = useState({ message: '' });

    const modalTitle = mode === 'add' ? `프로그램 추가` : `프로그램 수정`;

    const addBtnClick = async (data) => {
        const insertData = { ...data, programId, title };
        request.post(`/academy`, insertData)
            .then(() => closeModal('등록이 완료되었습니다.'))
            .catch(() => setSnackbar({ message: '이미 등록된 교육입니다.' }));
    };

    const editBtnClick = async (data) => {
        if (status === 'closed') setSnackbar({ message: '마감된 교육은 수정할 수 없습니다.' });
        else
            request.put(`/academy`, { ...data, programId, academyId })
                .then(() => closeModal('수정이 완료되었습니다.'))
                .catch(() => setSnackbar({ message: '해당 날짜에 동일 교육이 존재합니다.' }));
    };

    const deleteBtnClick = async () => {
        request.delete(`/academy`, { academyId })
            .then(() => closeModal('교육이 삭제되었습니다.'))
            .catch(() => setSnackbar({ message: '교육생이 한 명 이상 등록되어있어서 삭제 불가능합니다.' }));
    };

    const clickEvent = (event) => () => handleSubmit(event)();



    const Content = <div className="tbl-wrap bdr bdr-gray">
        <form>
            <table className="tbl tbl-singleline" width="100%">
                <colgroup>
                    <col wdith="15%" />
                    <col wdith="" />
                </colgroup>
                <tbody>
                    {INPUT_TABLE?.map((item, i) => (
                        <tr key={i}>
                            <th>
                                {item.head}
                                <em className="essential">{item.required ? ` *` : ``}</em>
                            </th>
                            <td>
                                <input
                                    className="fm-control w-100"
                                    {...register(item.name, {
                                        value: props[item.name] ?? '',
                                        ...item,
                                    })}
                                    {...item}
                                />
                                {errors[item.name] && <ErrorMessage message={errors[item.name]?.message} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
        <Snackbar props={snackbar} />
    </div>

    const Footer =
        <div className="btn-wrap p-side-20 fm-group" style={{ justifyContent: 'space-between' }}>
            <div>
                {mode == 'add' ? <></> : <Button variant={`outline-warn`} children={'삭제'} onClick={clickEvent(deleteBtnClick)} />}
            </div>
            <div>
                {mode == 'add' ? <>
                    <Button variant={`outline`} children={'취소'} onClick={() => dispatch({ type: 'MODAL_CLOSE' })} />
                    <Button variant={`solid`} children={`추가`} onClick={clickEvent(addBtnClick)} />
                </> : <></>}
            </div>
            <div>
                {mode == 'add' ? <></> : <>
                    <Button variant={`outline`} children={'취소'} onClick={() => dispatch({ type: 'MODAL_CLOSE' })} />
                    <Button variant={`solid`} children={'수정'} onClick={clickEvent(editBtnClick)} />
                </>}
            </div>
        </div>

    return <Modal
        id={'AddProgram'}
        modalTitle={modalTitle}
        contents={Content}
        footer={Footer}
    />
};
