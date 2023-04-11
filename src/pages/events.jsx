import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Eventinerestcomponent from "@/components/Eventinerestcomponent";

import Layout from "@/layout/Layout";

const signin = () => {
    return (
        <div>
            <Layout>
                <Eventinerestcomponent />
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

export default signin;
