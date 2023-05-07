import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Eventcreation from "@/components/Eventcreation";
import ScrollerTopcomponent from "@/components/ScrollerTopcomponent";

import Layout from "@/layout/Layout";

const eventcreation = () => {
    return (
        <div>
            <Layout>
                <Eventcreation />
                <ScrollerTopcomponent />
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

export default eventcreation;
