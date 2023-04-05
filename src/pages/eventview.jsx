import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import EventView from "@/components/EventView";

import Layout from "@/layout/Layout";

const eventview = () => {
    return (
        <div>
            <Layout>
                <EventView />
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

export default eventview;
