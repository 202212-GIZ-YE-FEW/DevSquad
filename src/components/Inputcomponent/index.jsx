const Inputcomponent = ({
    onChange,
    value,
    id,
    name,
    type,
    placeholder,
    className,
    accept,
}) => {
    return (
        <input
            onChange={onChange}
            value={value}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={className}
            accept={accept}
        />
    );
};

export default Inputcomponent;
