import React from "react";

import Buttoncomponent from "../Buttoncomponent";
import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";

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
        <div className='flex flex-col justify-center items-center space-y-10 mt-8 mb-8'>
            <div className='flex flex-col sm:m-0 m-2 md:w-5/6'>
                <div className='flex flex-row sm:justify-start justify-center'>
                    <h1 className='text-2xl font-Rubik font-medium tracking-wide'>
                        Edit Profile
                    </h1>
                </div>
                <div className='mt-2 mb-2 sm:space-x-3 space-y-3 flex sm:flex-row flex-col sm:justify-start justify-center'>
                    <div class=' inline-flex items-center justify-center w-36 h-36 bg-black rounded-full'>
                        <span class='text-4xl text-white'>R</span>
                    </div>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Uplaod New'
                        fontSize='text-xl'
                    />
                    <Buttoncomponent
                        borderRaduis='rounded'
                        width='sm:w-64 w-52'
                        height='h-14'
                        label='Choose from Library'
                        fontSize='sm:text-xl text-lg'
                        border='border border-r-2 border-b-2'
                        borderColor='border-black'
                        fontWeight='font-medium'
                    />
                </div>
            </div>

            <div className='flex flex-col w-5/6 space-y-4'>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Name (Required)
                    </label>
                    <Inputcomponent
                        type='text'
                        placeholder='Name'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Your Location
                    </label>
                    <Inputcomponent
                        type='text'
                        placeholder='Location'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                    />
                </div>
            </div>
            <div className='sm:m-6 m-2'>
                <div className='flex flex-row sm:justify-start justify-center mb-3'>
                    <h1 className='text-2xl font-Rubik font-medium'>
                        Your Interests
                    </h1>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-8'>
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
                <div className='flex flex-row sm:justify-end justify-center sm:m-6 m-2'>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Save Changes'
                        fontSize='text-xl'
                    />
                </div>
            </div>

            <div className='flex flex-col items-center bg-slate-300 rounded-lg sm:p-7 p-1'>
                <div className='flex flex-row sm:justify-start justify-center mb-3 mt-2 sm:mt-0 sm:w-full'>
                    <h1 className='text-2xl font-Rubik font-medium'>
                        Change Password
                    </h1>
                </div>

                <div className='flex justify-center flex-col sm:flex-row'>
                    <Inputcomponent
                        type='password'
                        placeholder='Password'
                        className='border border-black rounded p-3 w-48 m-4'
                    />
                    <Inputcomponent
                        type='password'
                        placeholder='Retype Password'
                        className='border border-black rounded p-3 w-48 m-4'
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:justify-end justify-center sm:m-6 m-2 sm:w-full'>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Submit'
                        fontSize='text-xl'
                    />
                    <Buttoncomponent
                        bgColor='bg-white'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        label='Cancel'
                        fontSize='text-xl'
                        border='border border-r-2 border-b-2'
                        borderColor='border-black'
                    />
                </div>
            </div>
        </div>
    );
}
