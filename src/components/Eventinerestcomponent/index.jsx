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

            <div className='fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4  w-full sm:w-80 h-80 sm:h-full overflow-y-scroll sm:overflow-auto scrollbar '>
                <div className='grid grid-cols-1 gap-2 '>
                    <p className='font-medium font-Rubik underline text-center sm:block hidden'>
                        Pick Your Interest
                    </p>
                    {titles &&
                        titles.map((title) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    afterChecked='flex items-center justify-center text-center md:border-2 md:border-black border-0 md:bg-secondry-orange bg-white p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    beforeChecked='checked flex items-center justify-center text-center  md:border-2 md:border-black border-0 p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                    view='md:hidden'
                                    block='md:block'
                                    flex='flex'
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Eventinerestcomponent;
