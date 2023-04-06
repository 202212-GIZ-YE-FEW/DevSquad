import React from "react";

import Checkboxcomponent from "../Checkboxcomponent";

export default function ProfilePage() {
    const titles = [
        "No Poverty",
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
        "Life Below Water",
        "Life On Land",
        "Peace And Justice And Strong Institutions",
    ];
    return (
        <div className='grid grid-rows-4 justify-center'>
            <div className='flex flex-col'>
                <div className=''>
                    <h1>Edit Profile</h1>
                </div>
                <div>
                    <div class=' inline-flex items-center justify-center w-36 h-36 m-2 bg-black rounded-full'>
                        <span class='text-4xl text-white'>R</span>
                    </div>
                    <button>Uplaod New</button>
                    <button>Choose from Library</button>
                </div>
            </div>

            <div>
                <div>
                    <label>Name (Required)</label>
                    <input type='text' placeholder='Name' />
                </div>
                <div>
                    <label>Your Location</label>
                    <input type='text' placeholder='Location' />
                </div>
            </div>
            <div>
                <h1>Your Interests</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-8 items-center'>
                    {titles &&
                        titles.map((title) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    checked={true}
                                    textColor='text-black'
                                    textColorChecked='text-black'
                                    borderColor='border-black'
                                    borderRightAndDown='border-r-2 border-b-2'
                                    height='h-20'
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
