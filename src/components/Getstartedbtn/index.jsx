import Link from "next/link";
const Getstartedbtn = () => {
    return (
        <div>
            <Link
                href='/blogs'
                className='w-20 h-7 py-2.5 px-4 rounded-lg bg-primary-blue text-white text-2xl font-medium'
            >
                Get Started
            </Link>
        </div>
    );
};

export default Getstartedbtn;
