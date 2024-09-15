import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import NavComponent from "./NavComponent";
import MapComponent from "./MapComponent";
import "bulma/css/bulma.min.css";
import {
    SignedIn,
    SignedOut,
} from "@clerk/clerk-react";

function HomeComponent() {
    return (
        <div>
            <SignedOut>
                helloooooo
            </SignedOut>
            <SignedIn>
                <MapComponent />
            </SignedIn>
        </div>
    );
}

export default HomeComponent;
