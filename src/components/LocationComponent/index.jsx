import { useTranslation } from "next-i18next";
import React from "react";

export default function LocationComponent({ setShowModal, city, country }) {
    const { t } = useTranslation("common");

    return (
        <div className='p-6 sm:p-0 bg-white w-full sm:h-full h-[80vh] fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 shadow-inner sm:shadow-none shadow-gray-700 rounded-lg'>
            <div className='border-t-2 border-b-2 border-black h-32 font-medium text-center w-full mt-[20%] sm:mt-0'>
                <button
                    className='underline p-4'
                    onClick={() => setShowModal(true)}
                >
                    {t("location.changeLocation")}
                </button>
                <p className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 w-full'>
                    {city} {country ? " / " + country : ""}
                </p>
            </div>
        </div>
    );
}
