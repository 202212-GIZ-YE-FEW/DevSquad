import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import EventView from "@/components/EventView";

import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { db, auth } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    query,
    addDoc,
    where,
    documentId,
} from "firebase/firestore";

const eventsCollectionRef = collection(db, "events");
const eventview = (props) => {
    {
        console.log(props);
    }
    const { entry, id } = props;
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

export const getStaticPaths = async () => {
    const entries = await getDocs(eventsCollectionRef);
    const paths = entries.docs.map((entry) => ({
        params: {
            ...entry.data(),
            id: entry.id,
        },
    }));
    return {
        paths,
        fallback: true,
    };
};

export const getStaticPropsEvent = async (context) => {
    const { id } = context.params;
    const q = query(eventsCollectionRef, where(documentId(), "==", id));
    const res = await getDocs(q);
    const entry = res.docs.map((entry) => entry.data());
    if (entry.length) {
        return {
            props: {
                entry: entry[0],
                id: id,
            },
        };
    } else {
        return {
            props: {},
        };
    }
};

export default eventview;
