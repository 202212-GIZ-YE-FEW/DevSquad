const Inputcomponent = ({
    block,
    flex,
    checkMargin,
    intrestMargin,
    afterChecked,
    beforeChecked,
    view,
    title,
    checked,
    onChange,
    value,
    name,
    ...props
}) => {
    // const defaultChecked = checked ? false : checked;
    // const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div>
            <label className={`${flex} ${block}`}>
                <input
                    type='checkbox'
                    checked={checked}
                    // onChange={() => setIsChecked((prev) => !prev)}
                    value={value}
                    onChange={onChange}
                    className={
                        checked
                            ? `checked ${view} ${checkMargin}`
                            : `${view} ${checkMargin}`
                    }
                    name={name}
                    {...props}
                />
                <span
                    className={
                        checked
                            ? `${afterChecked} ${intrestMargin}`
                            : `${beforeChecked} ${intrestMargin}`
                    }
                >
                    {title}
                </span>
            </label>
        </div>
    );
};

export default Inputcomponent;
