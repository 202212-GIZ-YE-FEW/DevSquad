import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

export default function Gmap(props) {
    // set the center of the map to be Montreal/Canada
    const center = {
        lat: 45.5017,
        lng: -73.5673,
    };

    // set up the state for the red marker's position
    const [markerP, setMarkerP] = useState(center);

    // set the size of the map container
    const containerStyle = {
        width: "400px",
        height: "400px",
    };

    // function to get the latitude and longitude of the marker
    //  when the marker position changed
    const getMarkerPosition = (pointPosition) => {
        let lat = pointPosition.lat();
        let lng = pointPosition.lng();

        // update the marker's position in the state
        setMarkerP({
            lat: lat,
            lng: lng,
        });

        // get the city and other location information
        getCity(lat, lng);
    };

    function getCity(lat, lng) {
        // create a new XMLHTTP request
        let xhr = new XMLHttpRequest();

        // set up the request with the LocationIQ API
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
        // send the request
        xhr.send();
        // listen for changes to the request
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);

        // function to process the response from the LocationIQ API
        function processRequest() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);

                // object to store the city and country information from the response
                let locationInfo = {
                    location: response.display_name,
                    city: response.address.county,
                    country: response.address.country,
                };
                // pass the location information back to the parent component
                props.locationInfo(locationInfo);
            }
        }
    }

    // render the map component with the Google Maps API and the marker
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
                    // when the map is clicked, update the marker's position
                    getMarkerPosition(arg.latLng);
                }}
            >
                <MarkerF
                    onDragEnd={(arg) => {
                        // when the marker is dragged, update its position
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
