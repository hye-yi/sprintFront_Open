export const ErrorMessage = ({ message }) => (
    <small className="ft-red" role="alert">
        <i className="icon-close-circle ft-red mr-5"></i>
        {message}
    </small>
);