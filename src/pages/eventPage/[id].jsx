import { db } from "../../../config/firebase";
import {
    collection,
    getDocs,
    query,
    where,
    documentId,
} from "firebase/firestore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Layout from "@/layout/Layout";
import EventView from "@/components/EventView";
import { useRouter } from "next/navigation";

const eventsCollectionRef = collection(db, "events");
export default function EventPage(props) {
    const { entry, id } = props;
    const router = useRouter();

    if (router.isFallback) {
        return <div>loading</div>;
    } else {
        if (entry) {
            return (
                <Layout>
                    <EventView entry={props.entry} id={props.id} />
                </Layout>
            );
        } else {
            return <div>not found</div>;
        }
    }
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

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const q = query(eventsCollectionRef, where(documentId(), "==", id));
    const res = await getDocs(q);
    const entry = res.docs.map((entry) => entry.data());
    if (entry.length) {
        return {
            props: {
                entry: entry[0],
                id: id,
                ...(await serverSideTranslations(context.locale, ["common"])),
            },
        };
    } else {
        return {
            props: {},
        };
    }
};
