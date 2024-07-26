import { Button } from 'components';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApiRequest } from 'utils';
import { Box, Popper, Typography, Fade, Paper, CircularProgress } from '@mui/material';
import { AcademyModal } from './Modal';
import { TABLE_HEAD } from '../variables/ListHeadVar';

export const ParticipantList = ({ props, rerendering }) => {
    const { participantList = [] } = props;

    const [btnProps, setBtnProps] = useState();
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    const editBtnClick = (data) => {
        setBtnProps({
            ...data,
        });
        dispatch({ type: 'MODAL_OPEN' });
    };

    useEffect(() => {
        const result = participantList.map((item, i) => ({
            ...item,
            no: i + 1,
            userPrincipalId: item.eduInfo.userPrincipalId,
        }));
        setTableData(result);
    }, [, props]);

    return (
        <>
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
                                    <AssignBtn data={row} rerendering={rerendering} />
                                </td>
                                <td className="align-center">
                                    <button className="btn small" onClick={() => editBtnClick(row)}>
                                        <i className="icon-create" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isOpen && <AcademyModal props={btnProps} />}
            </div>
        </>
    );
};

const AssignBtn = ({ data, rerendering }) => {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const request = new ApiRequest;

    const clickAssign = async () => {
        setLoading(true);
        const assignResult = await request.put(`/participant/assign`, { ...data });
        setTimeout(() => {
            setLoading(false);
            rerendering();
        }, 5000);
    };

    const clickTerminate = async () => {
        setLoading(true);
        request.put(`/participant/terminate`, { ...data })
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                    rerendering();
                }, 5000);
            })
            .catch((response) => {
                setLoading(false);
                alert(`리소스 해지에 문제가 생겼습니다. ERROR: ${response}`);
                rerendering();
            });
    };

    const popperOpen = () => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== 'bottom-end' || !prev);
        setPlacement('bottom-end');
    };

    const popperClose = () => {
        setOpen((prev) => placement !== 'bottom-end' || !prev);
    };

    if (data.flag == 'deactive')
        return (
            <Button size={'small'} onClick={clickAssign}>
                {loading ? <CircularProgress style={{ color: '#fff' }} size={20} /> : '할당'}
            </Button>
        );
    if (data.flag == 'active')
        return (
            <>
                <Box sx={{ zIndex: 'tooltip' }}>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography sx={{ p: 2 }}>
                                        해당 사용자에게 할당된 리소스들이 모두 삭제 됩니다.
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
                                            onClick={() => (popperClose(), clickTerminate())}
                                        >
                                            해지
                                        </Button>
                                    </div>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </Box>

                <Button variant={'outline'} size={'small'} onClick={popperOpen()}>
                    {loading ? <CircularProgress style={{ color: '#8639b4' }} size={20} /> : '해지'}
                </Button>
            </>
        );
    if (data.flag == 'closed')
        return (
            <Button variant={'disabled'} size={'small'} disabled={true} style={{ cursor: 'default' }}>
                마감
            </Button>
        );
    if (data.flag == 'none') return;
};
