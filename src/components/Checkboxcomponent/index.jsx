import { useState } from "react";
const Inputcomponent = ({
    afterChecked,
    beforeChecked,
    view,
    title,
    checked,
    ...props
}) => {
    const defaultChecked = checked ? false : checked;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div>
            <label className='flex md:block'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    className={isChecked ? `checked ${view}` : `${view}`}
                    {...props}
                />
                <span
                    className={
                        isChecked ? `${afterChecked}` : `${beforeChecked}`
                    }
                >
                    {title}
                </span>
            </label>
        </div>
    );
};

export default Inputcomponent;
