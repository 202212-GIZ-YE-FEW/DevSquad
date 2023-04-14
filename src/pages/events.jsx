import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Eventslist from "@/components/Eventslist";

import Layout from "@/layout/Layout";

const events = () => {
    return (
        <div>
            <Layout>
                <Eventslist />
            </Layout>
        </div>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

export default events;
