import Image from "next/image";

const Eventcard = ({
    eventImage,
    eventDate,
    eventTitle,
    eventDetails,
    eventAttendance,
}) => {
    return (
        <div className='border-2 border-black rounded-lg px-4 my-6 font-Rubik '>
            <div className='flex justify-between'>
                <div>
                    <p className='pt-2'>{eventDate}</p>
                </div>
                <div className=' pt-2'>
                    {/* attendance */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <div class='relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                            <div class='-left-4 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                            <div class='-left-8 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                        </div>
                        <p className='font-Rubik p-2'>+12 Attendance</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 align-items-center gap-4 '>
                <div className='col-span-1'>
                    <Image
                        src={eventImage}
                        alt='eventCardImage'
                        width={650}
                        height={380}
                        responsive
                        className='rounded border-2 border-black'
                    />
                </div>
                <div className='col-span-2 flex flex-col'>
                    <p className='font-medium'>{eventTitle}</p>
                    <p className='font-normal line-clamp-2'>{eventDetails}</p>
                    <div className='flex justify-end py-5'>
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
