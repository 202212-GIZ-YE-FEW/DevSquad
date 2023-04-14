import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

export default function Gmap(props) {
    const center = {
        lat: 45.5017,
        lng: -73.5673,
    };

    const [markerP, setMarkerP] = useState(center);

    const containerStyle = {
        width: "400px",
        height: "400px",
    };

    const getMarkerPosition = (pointPosition) => {
        let lat = pointPosition.lat();
        let lng = pointPosition.lng();

        setMarkerP({
            lat: lat,
            lng: lng,
        });

        getCity(lat, lng);
    };

    function getCity(lat, lng) {
        let xhr = new XMLHttpRequest();
        // var lat = coordinates[0];
        // var lng = coordinates[1];

        // Paste your LocationIQ token below.
        xhr.open(
            "GET",
            "https://us1.locationiq.com/v1/reverse.php?key=" +
                process.env.NEXT_PUBLIC_LOCATIONIQ_APIKEY +
                "&lat=" +
                lat +
                "&lon=" +
                lng +
                "&format=json"
        );
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                let location = response.display_name;
                let city = response.address.county;
                let country = response.address.country;
                // console.log(city);

                props.loc(location);
                props.city(city);
                props.country(country);
                // onClickPositionView.innerHTML=city+"   ---"+coutry;
                // return city;
            }
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={markerP}
                zoom={15}
                onClick={(arg) => {
                    getMarkerPosition(arg.latLng);
                }}
            >
                <MarkerF
                    onDragEnd={(arg) => {
                        getMarkerPosition(arg.latLng);
                    }}
                    draggable={true}
                    position={markerP}
                    onLoad={() => console.log("Marker Loaded")}
                />
            </GoogleMap>
        </LoadScript>
    );
}
