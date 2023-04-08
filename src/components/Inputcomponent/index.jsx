const Inputcomponent = ({
    onChange,
    value,
    id,
    name,
    type,
    placeholder,
    className,
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
        />
    );
};

export default Inputcomponent;
