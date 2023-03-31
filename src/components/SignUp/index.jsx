import Image from "next/image";
import React from "react";

import google from "./Images/google.png";
import sitting from "./Images/Sitting.png";
import twitter from "./Images/twitter.png";

export default function SignUp() {
    return (
        <div className='grid grid-cols-1 place-items-center md:grid-cols-2'>
            {/* sitting image part */}
            <div className='grid justify-items-center'>
                <Image src={sitting} alt='sitting' className='p-6' />
            </div>

            {/* form part */}
            <div className='grid grid-cols-1 gap-y-2 m-3 md:m-0'>
                <div className='my-2 md:my-8 flex justify-center md:justify-start'>
                    <h1 className='font-bold text-xl tracking-wide'>Sign Up</h1>
                </div>

                {/* using flex box to reverse the component when it is mobile or tablet */}
                <div className='flex flex-col-reverse md:flex-col'>
                    {/* component one */}
                    <div className='grid grid-cols-1 gap-y-3'>
                        <button className='border border-r-2 border-b-2 rounded-md border-black flex justify-center py-1'>
                            <Image
                                src={twitter}
                                alt='Twitter'
                                className='w-5 pt-1'
                            />
                            <span className='pl-2'>Continue with Twitter</span>
                        </button>
                        <button className='border border-r-2 border-b-2 rounded-md border-black flex justify-center py-1'>
                            <Image
                                src={google}
                                alt='Google'
                                className='w-5 pt-1'
                            />
                            <span className='pl-2'>Continue with Google</span>
                        </button>
                    </div>

                    {/* component two */}
                    <div className='items-center hidden sm:inline-flex'>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                        <span className='px-3 text-gray-500 bg-white'>OR</span>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                    </div>

                    {/* component three */}
                    <form action='#' className='grid grid-cols-1 gap-y-4'>
                        <div className='grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-2'>
                            <input
                                type='text'
                                placeholder='Name'
                                className='border  rounded-md border-black py-1 pl-2 mb-2 sm:mb-0'
                            />
                            <input
                                type='text'
                                placeholder='Surname'
                                className='border  rounded-md border-black py-1 pl-2'
                            />
                        </div>

                        <input
                            type='email'
                            placeholder='Email address'
                            className='border  rounded-md border-black py-1 pl-2'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='border  rounded-md border-black py-1 pl-2'
                        />
                        <p className='text-sm hidden sm:block'>
                            Already have an account?
                            <a
                                href='#'
                                className='md:underline text-orange-400 md:text-black '
                            >
                                Sign in
                            </a>
                        </p>

                        <button className='rounded-md bg-orange-400 text-white md:w-24 py-1 mb-4 sm:mb-0'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
