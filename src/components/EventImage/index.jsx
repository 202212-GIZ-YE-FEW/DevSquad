import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import { storage } from "../../../config/firebase";

export default function EventImage({ pic, width, height, className, onClick }) {
    const [image, setImage] = useState("");

    const img = async () => {
        if (pic.startsWith("https")) {
            setImage(pic);
        } else {
            // get the evne image from the firebase storage
            // pic contains the name of the image
            const storageRef = ref(storage, "eventsFolder/" + pic);
            // get the image as an url
            const url = await getDownloadURL(storageRef);

            setImage(url);
        }
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
                onClick={onClick}
            />
        </div>
    );
}
