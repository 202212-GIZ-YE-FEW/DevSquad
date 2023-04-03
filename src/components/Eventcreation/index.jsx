import Link from "next/link";

import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";

const Eventcreation = () => {
    const titles = [
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
        <div className=' container mx-auto md:px-32 px-10 pt-12	pb-4 font-Rubik'>
            {/* choose event section */}
            <div className=' grid md:grid-cols-2 gap-10  grid-cols-1 mb-4 '>
                <div>
                    <p className='font-medium py-5'>Choose Location</p>
                    <p className='md:pr-28 text-primary-gray pb-7'>
                        Pebble Events can be both local or online Choose where
                        you want to host your event.
                    </p>
                    <Inputcomponent
                        type='text'
                        id='eventLocation'
                        name='eventLocation'
                        value='eventLocation'
                        className='w-80	 h-12 border border-black rounded'
                        placeholder='Izmer'
                    />
                </div>
                <div className='pt-11	'>
                    <p className='text-7xl font-medium'>Izmer</p>
                    <Link href='#' className='cursor-pointer text-blue-600'>
                        choose location
                    </Link>
                </div>
            </div>
            {/* Choose Event Type section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Choose Event Type</p>
                <p className='text-primary-gray pb-7'>
                    Every Pebble events should serve at least one of th
                    sustainable devlopment goals of United Nations. whitch goal
                    do you want to help in ? Sellect all thet apply
                </p>
                <div className=' grid md:grid-cols-4 gap-x-10 gap-y-4  grid-cols-2 mb-4 '>
                    {titles &&
                        titles.map((title) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    checked={true}
                                />
                            );
                        })}
                </div>
            </div>
            {/* Event Title section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Title:</p>
                <p className='text-primary-gray pb-7'>
                    Choose a title that will give people a clear idea of what
                    the event is about. Feel free to be creative! You can edit
                    this later if you change your mind.
                </p>
                <Inputcomponent
                    type='text'
                    id='eventTitle'
                    name='eventTitle'
                    value='eventTitle'
                    className='w-full	 h-12 border border-black rounded'
                    placeholder=''
                />
            </div>
            {/* Event date section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Date:</p>
                <p className='text-primary-gray pb-7'>Choose a Event date</p>
                <Inputcomponent
                    type='date'
                    id='eventDate'
                    name='eventDate'
                    value='eventDate'
                    className='w-80	 h-12 border border-black rounded'
                    placeholder=''
                />
            </div>
            {/* Event describtion section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event description:</p>
                <p className='text-primary-gray pb-7'>
                    Describe the purpose of your event. Who should join and what
                    will you do at the event?
                </p>
                <textarea
                    placeholder='Please write at least 50 characters'
                    id='dateLocation'
                    name='dateLocation'
                    className='w-full	 h-44 border border-black rounded placeholder:p-2 placeholder:text-black'
                />
            </div>
            {/* Event image section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Image:</p>
                <p className='text-primary-gray pb-7'>
                    We have found that listings with a photo attract more
                    interest.
                </p>
                <Inputcomponent
                    type='file'
                    id='eventImage'
                    name='eventImage'
                    value='eventImage'
                    className='w-96	 h-12 border border-black rounded file:h-12'
                    placeholder=''
                />
            </div>
            {/* done section */}
            <div>
                <p className='font-medium py-3 text-3xl'>
                    Almost Done! Just take a minute to review our guidlines.
                </p>
                <ul className='list-disc'>
                    <p className='text-primary-gray py-2'>
                        Pebble is all about helping people with the help of
                        volunteers like you. This means that all events should:
                    </p>
                    <li className='font-normal'>
                        Be transparent about the event’s intentions.
                    </li>
                    <li className='font-normal'>
                        Encourage real human interactions in person or online.
                    </li>
                    <li className='font-normal'>
                        Have the host present in all events.
                    </li>
                </ul>

                <p className='text-primary-gray'>
                    You can read more about all of this in our
                    <Link href='#' className='text-blue-600'>
                        Community Guidelines
                    </Link>
                </p>
                <div className='py-20 flex flex-col items-center justify-center text-center'>
                    <input
                        type='button'
                        id='done'
                        name='done'
                        value='Agree with tearms and create Event!'
                        className='w-96	h-12 border border-black rounded'
                    />
                </div>
            </div>
        </div>
    );
};

export default Eventcreation;
