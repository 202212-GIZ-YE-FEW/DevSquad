import React from "react";
import { useState } from "react";
export default function CalendarComponent({ day, year, month }) {
    const [isChecked, setIsChecked] = useState(false);
    let selectedDate = [];
    function handleDayClick() {
        selectedDate.push(`${year}-${month}-${day}`);
        console.log(selectedDate);
    }
    return (
        <label>
            <input
                type='checkbox'
                key={day}
                onChange={() => setIsChecked((isChecked) => !isChecked)}
                hidden
                onClick={handleDayClick}
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
