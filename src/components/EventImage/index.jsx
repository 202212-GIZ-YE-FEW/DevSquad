import { useEffect, useState } from "react";
import { storage } from "../../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default function EventImage({ pic, width, height, className }) {
    const [image, setImage] = useState("");

    const img = async () => {
        const storageRef = ref(storage, "eventsFolder/" + pic);

        const url = await getDownloadURL(storageRef);

        setImage(url);
    };

    useEffect(() => {
        img();
    }, []);

    return (
        <div>
            <img
                src={image}
                width={width}
                height={height}
                className={className}
            />
        </div>
    );
}
