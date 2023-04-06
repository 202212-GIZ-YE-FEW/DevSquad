import { useState } from "react";
const Inputcomponent = ({
    textColor = "text-white",
    textColorChecked = "text-primary-orange",
    borderColor = "border-primary-orange",
    borderRightAndDown = " ",
    font = "font-Rubik",
    height = "h-32",
    title,
    checked,
    ...props
}) => {
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
                            ? `checked flex items-center justify-center text-center ${textColorChecked} border ${borderColor} ${borderRightAndDown} p-3 rounded ${height}  ${font} font-medium sm:text-base text-sm`
                            : `flex items-center justify-center ${textColor} text-center border ${borderColor} ${borderRightAndDown} bg-primary-orange p-3 rounded ${height} ${font} font-medium sm:text-base text-sm`
                    }
                >
                    {title}
                </span>
            </label>
        </div>
    );
};

export default Inputcomponent;
