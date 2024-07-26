
import { useEffect, useState } from 'react';
import '../assets/css/snackbar.css';

export const Snackbar = ({ props }) => {
    const { message, severity = 'warning', duration = 3000, trigger } = props
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => { setShow(false) }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, trigger]);

    const colorMatch = {
        info: '#bbdefb',
        warning: '#e57373'
    }

    return (
        <div className={`snackbar ${show ? 'show' : ''}`} style={{ backgroundColor: colorMatch[severity] }}>
            <span>{message}</span>
        </div>
    );
};


