import Image from "next/image";

const Eventcard = () => {
    return (
        <div className='md:mx-32 mx-10 border-2 border-black rounded-lg px-5 my-10 font-Rubik '>
            <div className='flex justify-between'>
                <div>
                    <p className='pt-2'>FRI, JUL -7:00 PM GMT+3</p>
                </div>
                <div className=' pt-2'>
                    {/* attendance */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <div class='relative inline-flex items-center justify-center w-8 h-8 rounded-full'>
                                <Image
                                    src='/images/Name.png'
                                    alt='eventCardImage'
                                    width={650}
                                    height={380}
                                    responsive
                                    className='absolute top-0 right-8 z-10 w-full h-full object-cover '
                                />
                                <Image
                                    src='/images/Name.png'
                                    alt='eventCardImage'
                                    width={650}
                                    height={380}
                                    responsive
                                    className='absolute top-0 right-4 z-20 w-full h-full object-cover '
                                />

                                <Image
                                    src='/images/Name.png'
                                    alt='eventCardImage'
                                    width={650}
                                    height={380}
                                    responsive
                                    className='absolute top-0 right-0 z-30 w-full h-full object-cover '
                                />
                            </div>
                        </div>
                        <p className='font-Rubik p-2'>+12 Attendance</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 align-items-center gap-4 '>
                <div className='col-span-1 p-2 '>
                    <Image
                        src='/images/Rectangle2.png'
                        alt='eventCardImage'
                        width={650}
                        height={380}
                        responsive
                        className='rounded border-2 border-black'
                    />
                </div>
                <div className='col-span-2 flex flex-col'>
                    <p className='font-medium'>Title of the Event</p>
                    <p className='font-normal line-clamp-2'>
                        Details about the event. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididuntuyuuyii iyooyi Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Deleniti quos pariatur ad
                        nemo veritatis repudiandae error suscipit. Quas saepe
                        vel cupiditate, ipsa adipisci excepturi animi magnam
                        facere culpa aliquam asperiores!
                    </p>
                    <div className='flex justify-end py-10'>
                        <button className='bg-primary-orange text-white rounded px-8 py-1 '>
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventcard;
