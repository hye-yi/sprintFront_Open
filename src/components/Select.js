export const Select = ({ register, name, options, placeholder, ...rest }) => {

    return (
        <select {...register(name)} {...rest} defaultValue="00" >
            {placeholder ? <option value='00' disabled hidden >{placeholder}</option> : <></>}
            {options.map(({ value, text }, i) => (
                <option key={i} label={text} value={value}>{text}</option>
            ))}
        </select>
    );
}