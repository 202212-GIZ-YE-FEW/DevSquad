import React from "react";

import "animate.css";

const Alertcomponent = ({ type, message, icon }) => {
    const getAlertColor = () => {
        switch (type) {
            case "success":
                return "bg-green-500 text-white";
            case "warning":
                return "bg-yellow-500 text-white";
            case "error":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 z-10 mx-2 p-4 max-w-4xl flex justify-center items-center space-x-2 shadow rounded animate__animated animate__backInRight ${getAlertColor()}`}
        >
            {/* :::alert message */}
            <p className='font-medium font-Rubik text-lg'>{message}</p>
            <p>{icon}</p>
        </div>
    );
};

export default Alertcomponent;
