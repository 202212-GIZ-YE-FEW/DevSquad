import Image from "next/image";
const Goalimage = ({ arrImage }) => {
    return (
        <>
            {arrImage &&
                arrImage.map((title) => {
                    return (
                        <div key={title} className='relative w-32 h-32'>
                            <Image
                                src={title}
                                alt='profile'
                                fill
                                className='object-contain rounded-xl'
                            />
                        </div>
                    );
                })}
        </>
    );
};

export default Goalimage;
