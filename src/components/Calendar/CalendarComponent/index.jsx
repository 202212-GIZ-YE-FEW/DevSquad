import React from "react";
import { useState } from "react";

export default function CalendarComponent({ day, year, month, date }) {
    const [isChecked, setIsChecked] = useState(false);
    let selectedDate;
    // add 0 to the from 1 to 9 for filtering
    if (month <= 9) {
        month = "0" + month;
    }

    if (day <= 9) {
        day = "0" + day;
    }
    function handleDayClick() {
        // store the select date and send it to event list for filtring
        selectedDate = `${year}-${month}-${day}`;
        date(selectedDate);
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
