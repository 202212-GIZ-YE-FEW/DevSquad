import { useTranslation } from "next-i18next";

import { types } from "@/utils/types";

import Checkboxcomponent from "../Checkboxcomponent";

const Eventinerestcomponent = ({ checkedState, handleFilterChange }) => {
    const { t } = useTranslation("common");

    return (
        <>
            {/* desktop design */}
            <div className='md:w-64 sm:w-56 w-full bg-white sm:h-full h-[50%] overflow-auto scrollbar fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 shadow-inner sm:shadow-none shadow-gray-700 rounded-lg'>
                <div className='grid grid-cols-1 gap-2 '>
                    <p className='font-medium font-Rubik underline text-center sm:block hidden'>
                        {t("eventinterest.pick")}
                    </p>
                    <p className='font-medium font-Rubik text-center block sm:hidden text-lg my-2'>
                        {t("eventinterest.changeInterset")}
                    </p>
                    {types &&
                        types.map((value, index) => {
                            return (
                                <Checkboxcomponent
                                    key={index}
                                    title={value}
                                    name='types'
                                    value={value}
                                    onChange={handleFilterChange}
                                    id={index}
                                    checked={checkedState[index]}
                                    afterChecked='flex items-center justify-center text-center sm:border-2 sm:border-black border-0 sm:bg-secondry-orange bg-white md:p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    beforeChecked='checked flex items-center justify-center text-center  sm:border-2 sm:border-black border-0 md:p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    view='sm:hidden'
                                    block='sm:block'
                                    flex='flex'
                                    intrestMargin='ml-2'
                                    checkMargin='sm:m-0 m-6'
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Eventinerestcomponent;
