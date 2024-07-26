import { Button } from 'components';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProgramModal } from './Modal';
import { ApiRequest } from 'utils';
import { CircularProgress, Box, Popper, Typography, Fade, Paper } from '@mui/material';
import { TABLE_HEAD } from '../variables/ListHeadVar';


export const AcademyList = ({ props, rerendering }) => {
    const { academyList = [], programId, title } = props;
    const [btnProps, setBtnProps] = useState();
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    const addBtnClick = () => {
        btnPropsInit();
        dispatch({ type: 'MODAL_OPEN' });
    };
    const btnPropsInit = () => {
        setBtnProps({
            mode: 'add',
            title,
            programId,
            OpenStart: '',
            instructor: '',
            reservationTime: '',
            academyId: '',
        });
    };
    const editBtnClick = (data) => {
        setBtnProps({
            ...data,
            mode: 'edit',
        });
        dispatch({ type: 'MODAL_OPEN' });
    };

    useEffect(() => {
        const result = academyList.map((item, i) => ({ ...item, no: i + 1 })).reverse();
        setTableData(result);
    }, [, props]);

    return (
        <>
            <div className="dp-flex mb-10">
                <div className="ml-auto">
                    <div className="btn-wrap">
                        <Button variant={'add'} size={'big'} onClick={addBtnClick}>
                            교육 추가
                        </Button>
                    </div>
                </div>
            </div>
            <div className="tbl-wrap">
                <table className="tbl tbl-singleline" width="100%">
                    <colgroup>
                        {TABLE_HEAD?.map(({ width }, i) => (
                            <col key={i} width={width} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {TABLE_HEAD?.map(({ title, align }, i) => (
                                <th key={i} style={{ textAlign: align }}>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, i) => (
                            <tr key={i}>
                                {TABLE_HEAD.slice(0, 6).map(({ key, align }, i) => (
                                    <td key={i} style={{ textAlign: align }}>
                                        {row[key] ?? ``}
                                    </td>
                                ))}
                                <td className="align-center">
                                    <CloseBtn data={row} rerendering={rerendering} />
                                </td>
                                <td className="align-center">
                                    <button className="btn small" onClick={() => editBtnClick(row)}>
                                        <i className="icon-create" />
                                    </button>
                                </td>
                                <td className="align-center">
                                    <button className="btn small">
                                        <Link
                                            to={`/admin/program/academy?programId=${row.programId}&academyId=${row.academyId}`}
                                        >
                                            <i className="icon-more-horiz" />
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isOpen && <ProgramModal props={btnProps} />}
            </div>
        </>
    );
};

const CloseBtn = ({ data, rerendering }) => {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const request = new ApiRequest;

    const clickClose = async () => {
        setLoading(true);
        const closeResult = await request.put(`/academy/close`, { ...data });
        setTimeout(() => {
            setLoading(false);
            rerendering();
        }, 5000);
    };

    const popperOpen = () => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== 'bottom-end' || !prev);
        setPlacement('bottom-end');
    };

    const popperClose = () => {
        setOpen((prev) => placement !== 'bottom-end' || !prev);
    };

    if (data.status == 'active')
        return (
            <>
                <Box sx={{ zIndex: 'tooltip' }}>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography sx={{ p: 2 }}>
                                        마감된 교육의 교육생은 아이디 조회가 불가능합니다.
                                        {data.programId === '101' ? (
                                            <>
                                                <br />
                                                구독 15번에 있는 모든 리소스가 삭제됩니다.
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </Typography>

                                    <div className="popper-btn-wrap">
                                        <Button
                                            variant={'outline'}
                                            size={'small'}
                                            style={{ marginRight: '10px' }}
                                            onClick={popperClose}
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            variant={`outline-warn`}
                                            size={'small'}
                                            onClick={() => (popperClose(), clickClose())}
                                        >
                                            마감
                                        </Button>
                                    </div>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </Box>
                <Button size={'small'} onClick={popperOpen()}>
                    {loading ? <CircularProgress style={{ color: '#fff' }} size={20} /> : '마감'}
                </Button>
            </>
        );
    if (data.status == 'closed')
        return (
            <Button variant={'disabled'} size={'small'} disabled={true} style={{ cursor: 'default' }}>
                마감
            </Button>
        );
    if (data.flag == 'none') return;
};
