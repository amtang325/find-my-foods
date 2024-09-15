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
                <div className="hero is-fullheight" style={{background: 'linear-gradient(135deg, #FF9D6C 0%, #BB4E75 100%)'}}>
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title is-1 has-text-white" style={{fontFamily: "'Pacifico', cursive", fontSize: '4rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                                Find My Foods!
                            </h1>
                            <p className="subtitle is-3 has-text-white" style={{fontFamily: "'Roboto', sans-serif", marginTop: '2rem'}}>
                                Embark on a culinary adventure
                            </p>
                            <div className="buttons is-centered" style={{marginTop: '3rem'}}>
                                <button className="button is-warning is-large is-rounded" style={{boxShadow: '0 4px 14px 0 rgba(255, 211, 105, 0.39)', transition: 'all 0.3s ease'}}>
                                    Sign In to Explore
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SignedOut>
            <SignedIn>
                <MapComponent />
            </SignedIn>
        </div>
    );
}

export default HomeComponent;
