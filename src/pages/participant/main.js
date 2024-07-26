import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRequest, checkEmail } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Select, Button, Snackbar } from 'components';
import { PwModal } from './components/Modal';
import logo_img from 'assets/images/admin_logo.png';

export const ParticipantMain = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const { isOpen } = useSelector((state) => state.modal);
    const request = new ApiRequest();
    const [programList, setProgramList] = useState([]);
    const [snackbar, setSnackbar] = useState({ message: '' });
    const [modalProps, setModalProps] = useState();

    const fetchData = async () => {
        const programs = await request.get(`/program`);
        const newPrograms = programs.map(({ programId, title }) => ({ value: programId, text: title }));
        setProgramList(newPrograms);
    };

    const onSubmit = (data) => {
        const { programId, email } = data;
        request.get(`/participant?programId=${programId}&email=${email}`).then((res) => {
            if (res.length === 0) setSnackbar({ message: '해당하는 로그인 정보가 없습니다.' });
            else {
                const activeParticipant = res.find((i) => i.flag === 'active' || i.flag === 'none');
                if (activeParticipant) {
                    const { programId, academyId } = activeParticipant;
                    setModalProps({ ...activeParticipant.eduInfo, programId, academyId });
                    dispatch({ type: 'MODAL_OPEN' });
                } else setSnackbar({ message: '해당 이메일은 조회할 수 있는 기한이 아닙니다.' });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div id="wrapper">
                <header id="header">
                    <a className="logo" onClick={() => navigate(`/admin/program?programId=101`)}>
                        <img src={logo_img} alt="logo" />
                    </a>
                </header>
                <div id="container">
                    <div className="bg-index"></div>
                    <div id="contents" role="main">
                        <div className="wrap-title">
                            <div className="title">
                                <h2>
                                    Drive extraordinary value,
                                    <br /> <span className="ft-primary">Cloud Sprint</span> Program
                                </h2>
                            </div>
                            <div className="desc">
                                <p>
                                    Cloud Sprint는 Microsoft Azure의 기초부터 심화까지, 클라우드 전문 컨설턴트의 코칭과
                                    <br /> 함께 학습하는 One-Day 클라우드 교육 프로그램입니다.
                                </p>
                            </div>
                        </div>
                        <div className="wrap-form">
                            <div className="inner">
                                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                                    <ul className="fm-group">
                                        <li className="flex-1">
                                            <label className="fm-label ft-medium">
                                                <span className="mr-10">①</span>신청하신 Cloud Sprint{' '}
                                                <span className="ft-primary">프로그램</span>을 선택해 주세요.
                                            </label>
                                            <Select
                                                placeholder={`프로그램 선택`}
                                                register={register}
                                                name={`programId`}
                                                className="fm-control huge"
                                                options={programList}
                                            />
                                        </li>
                                        <li className="flex-1">
                                            <label className="fm-label ft-medium">
                                                <span className="mr-10">②</span>프로그램 신청에 사용하신{' '}
                                                <span className="ft-primary">이메일</span>을 입력해 주세요.
                                            </label>
                                            <input
                                                className="fm-control huge"
                                                placeholder="example@address.com"
                                                {...register('email', {
                                                    validate: { email: (data) => checkEmail(data) },
                                                })}
                                            />
                                        </li>
                                        <li>
                                            <Button size={`huge`} type={`submit`}>
                                                로그인 정보 확인
                                            </Button>
                                        </li>
                                    </ul>
                                    {errors.email && alert('잘못된 이메일 형식입니다.')}
                                </form>
                                {isOpen && modalProps && <PwModal props={modalProps} />}
                                <Snackbar props={snackbar} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
