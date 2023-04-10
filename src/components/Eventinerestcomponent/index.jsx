import { useState } from "react";

import Checkboxcomponent from "../Checkboxcomponent";
const Eventinerestcomponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const titles = [
        "All",
        "No Poverty",
        "Zero Hunger",
        "Good Health And Well-Being",
        "Quality Education",
        "Gender Equality",
        "Clean Water And Sanitation",
        "Affordable And Clean Energy",
        "Decent Work And Economic Growth",
        "Industry Innovation And Infrastructure",
        "Reduced Inequalities",
        "Sustainable Cities And Communities",
        "Responsible Consumption And Production",
        "Climate Action",
        "Life Below Water",
        "Life On Land",
        "Peace And Justice And Strong Institutions",
    ];

    return (
        <>
            {/* disktop design */}
            <div className=' md:mx-32 mx-10 w-80 p-5 md:block hidden'>
                <div className='grid grid-cols-1 gap-2 '>
                    <p className='font-medium font-Rubik underline text-center'>
                        Pick Your Interest
                    </p>
                    {titles &&
                        titles.map((title) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    checked={true}
                                    afterChecked='flex items-center justify-center text-center border-2 border-black bg-secondry-orange p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    beforeChecked='flex items-center justify-center text-center  border-2 border-black  p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    view='md:hidden'
                                />
                            );
                        })}
                </div>
            </div>

            {/* mobaile design */}
            <div
                className={`fixed z-50 top-0 left-0  h-96 bg-opacity-50 transition-opacity md:hidden block ${
                    isOpen ? "" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4  w-full h-80 overflow-y-scroll scrollbar'>
                    <div className='grid grid-cols-1 gap-2 '>
                        {titles &&
                            titles.map((title) => {
                                return (
                                    <Checkboxcomponent
                                        key={title}
                                        title={title}
                                        checked={true}
                                        afterChecked='flex items-center  justify-center text-center   rounded h-10  font-Rubik font-normal sm:text-base text-xs p-2'
                                        beforeChecked='flex items-center justify-center text-center  rounded h-10  font-Rubik font-normal sm:text-base text-xs p-2'
                                        view='md:hidden '
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <button
                className='flex items-center  p-2 border border-black rounded mt-4 md:hidden'
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className='px-2'>Change Interest</p>
                <svg
                    width='13'
                    height='8'
                    viewBox='0 0 13 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M11.4704 0.705392C11.6865 0.465228 12.0564 0.445759 12.2965 0.661906C12.5366 0.878053 12.5561 1.24797 12.34 1.48813L7.07538 7.3385C6.84301 7.59672 6.43816 7.59672 6.20579 7.3385L0.941182 1.48813C0.725065 1.24797 0.744531 0.878053 0.984662 0.661906C1.22479 0.445759 1.59465 0.465228 1.81077 0.705392L6.64058 6.07259L11.4704 0.705392Z'
                        fill='#1A1A1A'
                    />
                </svg>
            </button>
        </>
    );
};

export default Eventinerestcomponent;