import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import Homepage from "@/components/Homepage";
import ScrollerTopcomponent from "@/components/ScrollerTopcomponent";

import Layout from "@/layout/Layout";
export default function HomePage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    return (
        <>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <BounceLoader color='#FDA855' loading={loading} />
                </div>
            ) : (
                <Layout>
                    <Homepage />
                    <ScrollerTopcomponent />
                </Layout>
            )}
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
