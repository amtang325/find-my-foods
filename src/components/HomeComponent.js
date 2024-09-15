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
                <header>
                    <h1>Find My Food</h1>
                </header>
                <div class="container">
                    <section id="contact">
                        <h2>Contact Us</h2>
                        <p>Have questions or feedback? Reach out to us at <a href="mailto:support@findmyfood.com">support@findmyfood.com</a>.</p>
                        <p>We are here to assist you with any inquiries you may have. Don't hesitate to get in touch!</p>
                    </section>
                </div>
                <footer>
                    <p>&copy; 2024 Find My Food. All rights reserved.</p>
                </footer>
            </SignedOut>
            <SignedIn>
                <MapComponent />
            </SignedIn>
        </div>
    );
}

export default HomeComponent;
