import { useDispatch } from 'react-redux';

export const Modal = (props) => {
    const { id, modalTitle = '', width = '500px', contents, footer } = props;
    const dispatch = useDispatch();

    return (
        <div id={id} className="modal">
            <div className="modal-flex">
                <div className="modal-flex-inner">
                    <div className="modal-header">
                        <div className="dp-flex">
                            <div className="mr-auto">
                                <h6 className="title">{modalTitle}</h6>
                            </div>
                            <div className="ml-auto">
                                <button className="close" onClick={() => dispatch({ type: 'MODAL_CLOSE' })}>
                                    <i className="icon-close" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-content" style={{ width: width }}>
                        {contents}
                    </div>
                    {footer ? (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
