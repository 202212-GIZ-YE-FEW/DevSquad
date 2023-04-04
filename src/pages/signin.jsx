import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SignIn from "@/components/SignIn";

import Layout from "@/layout/Layout";

const signin = () => {
    return (
        <div>
            <Layout>
                <SignIn />
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
