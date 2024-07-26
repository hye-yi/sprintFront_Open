import clsx from 'clsx';

export const Button = (props) => {
    const { children,
        variant = 'solid',
        style,
        disabled = false,
        type,
        size,
        onClick
    } = props;
    return (
        <button
            className={clsx('btn',
                {
                    [`btn-${variant}`]: variant ?? '',
                    [`${size}`]: size ?? ''
                })}
            type={type}
            style={style}
            disabled={disabled}
            onClick={onClick}
        >{children}
        </button>
    )
}