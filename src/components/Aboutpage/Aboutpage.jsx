import Image from "next/image";
import { useTranslation } from "next-i18next";

import TeamCards from "@/components/Aboutpage/Teamcards";

function Aboutpage() {
    const { t } = useTranslation("common");

    const team = [
        {
            name: "Ramiz Ali",
            github: "https://github.com",
            linkedin: "https://www.linkedin.com",
            instagram: "https://www.instagram.com",
            imageLink: "/images/icon.png",
        },
        {
            name: "Ruqaiah Saif",
            github: "https://github.com/RuqaiahSaif",
            linkedin: "https://www.linkedin.com/in/ruqaiah-saif-086b8a24b/",
            instagram: "https://www.instagram.com",
            imageLink: "/images/icon.png",
        },
        {
            name: " Rawan Salem Bamhdi",
            github: "https://github.com/rrawann",
            linkedin: "https://www.linkedin.com/in/rawan-salem-b-02570521b",
            instagram: "https://instagram.com/rrawnq",
            imageLink: "/images/icon.png",
        },
        {
            name: "Fatima Jubary",
            github: "https://github.com/fatGubari",
            linkedin: "https://www.linkedin.com/in/fatima-abdullah-37248226b/",
            instagram: "https://www.instagram.com",
            imageLink: "/images/icon.png",
        },
        {
            name: "Hekmat Mohammed Ali",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
            instagram: "https://www.instagram.com/",
            imageLink: "/images/icon.png",
        },
    ];

    return (
        <div>
            <div className='relative'>
                <Image
                    src='/images/aboutPage.png'
                    alt='About Page Image'
                    width={100}
                    height={500}
                    className='w-full '
                    layout='responsive'
                />

                <div className='absolute top-0 left-0 right-0 bottom-0'>
                    <div className='flex h-full w-full flex-col font-Rubik items-center justify-center'>
                        <h3 className='m-1 text-center text-xl font-bold md:m-4 md:text-5xl md:font-bold lg:text-5xl lg:font-bold'>
                            {t("aboutPage.title")}
                        </h3>

                        <p className='text-md mr-12 ml-12 text-center md:ml-24 md:mr-24 md:text-xl lg:ml-32 lg:mr-32 lg:text-2xl'>
                            {t("aboutPage.describtion")}
                        </p>
                    </div>
                </div>
            </div>
            <div className='m-10 min-h-[320px] font-Rubik overflow-hidden rounded-3xl bg-[#fef1e6] md:m-30 md:min-h-[900px] lg:m-44'>
                <h2 className='p-4 text-center text-2xl font-medium md:p-8 md:text-4xl md:font-bold lg:p-12 lg:text-5xl lg:font-bold'>
                    {t("aboutPage.team")}
                </h2>
                <div className='flex flex-row flex-wrap justify-center'>
                    {team.map((member, index) => {
                        return (
                            <TeamCards
                                key={index}
                                name={member.name}
                                github={member.github}
                                linkedin={member.linkedin}
                                instagram={member.instagram}
                                imageLink={member.imageLink}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='m-16 md:m-36'>
                <h2 className='mb-2 text-center font-Rubik text-2xl font-bold md:mb-4 md:text-4xl lg:mb-4 lg:text-4xl'>
                    {t("aboutPage.techTitle")}
                </h2>
                <p className='text-center font-Rubik text-sm md:text-2xl'>
                    {t("aboutPage.techDesc")}
                </p>
            </div>
        </div>
    );
}

export default Aboutpage;
