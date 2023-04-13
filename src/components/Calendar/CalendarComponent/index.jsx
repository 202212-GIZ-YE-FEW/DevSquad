import React from "react";
import { useState } from "react";
export default function CalendarComponent({ day }) {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <label>
            <input
                type='checkbox'
                key={day}
                onChange={() => setIsChecked((isChecked) => !isChecked)}
                hidden
            />
            <span
                className={
                    isChecked
                        ? "bg-primary-orange rounded font-bold text-lg p-1"
                        : "bg-white rounded font-bold text-lg"
                }
            >
                {day}
            </span>
        </label>
    );
}
