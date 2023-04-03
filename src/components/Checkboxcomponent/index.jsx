import { useState } from "react";
const Inputcomponent = ({ title, checked, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div>
            <label>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    className={isChecked ? "checked" : ""}
                    {...props}
                    hidden
                />
                <span
                    className={
                        isChecked
                            ? "checked flex items-center justify-center text-center text-primary-orange border border-primary-orange p-5 rounded h-20 md:w-48 lg:w-64 w-40"
                            : "flex items-center justify-center text-white text-center border bg-primary-orange p-5 rounded h-20 md:w-48 lg:w-64 w-40"
                    }
                >
                    {title}
                </span>
            </label>
        </div>
    );
};

export default Inputcomponent;
