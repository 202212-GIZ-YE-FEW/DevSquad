import React from "react";

export default function Buttoncomponent({
    label = " ",
    bgColor = "slate-300",
    textColor = "text-black",
    width,
    height,
    font = "font-Rubik",
    fontSize = "",
    fontWeight = "",
    borderColor = "",
    borderRaduis = "",
    border,
    margin = "m-2",
    padding = "p-2",
}) {
    return (
        <button
            className={`${bgColor} ${textColor} ${width} ${height} ${font} ${fontSize} ${borderColor} ${borderRaduis} ${border} ${margin} ${padding} ${fontWeight}`}
        >
            {`${label}`}
        </button>
    );
}
