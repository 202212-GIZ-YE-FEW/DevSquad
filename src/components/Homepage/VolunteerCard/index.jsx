import Image from "next/image";
const volunterCard = ({ volunteerImage, name, voldescribtion }) => {
    return (
        <div>
            <div className='flex flex-col items-center font-Rubik	'>
                <div className='relative w-20 h-20 '>
                    <Image
                        src={volunteerImage}
                        alt='profile'
                        fill
                        className=' object-contain rounded-full '
                    />
                </div>
                <div className='flex flex-col gap-2  pt-6'>
                    <p className='text-xl text-center font-medium'>{name}</p>
                    <p className='text-lg text-primary-gray text-center font-normal '>
                        {voldescribtion}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default volunterCard;
