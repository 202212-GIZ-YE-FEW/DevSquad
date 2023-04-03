const Inputcomponent = ({ value, id, name, type, placeholder, className }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={className}
        />
    );
};

export default Inputcomponent;
