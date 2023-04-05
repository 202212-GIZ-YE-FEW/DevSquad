import React from "react";

export default function Buttoncomponent({
    name = " ",
    bgColor = "slate-300",
    textColor = "text-white",
    width,
    height,
    font = "font-Rubik",
    fontSize,
    borderColor,
    borderRaduis,
    border,
    margin,
    padding,
}) {
    return (
        <button
            className={`${bgColor} ${textColor} ${width} ${height} ${font} ${fontSize} ${borderColor} ${borderRaduis} ${border} ${margin} ${padding}`}
        >
            {name}
        </button>
    );
}
