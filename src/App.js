import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import NavComponent from "./components/NavComponent";
import MapComponent from "./components/MapComponent";
import "bulma/css/bulma.min.css";

function App() {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  });

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });
  //   } else {
  //     console.log("Geolocation is not available in your browser.");
  //   }
  // }, []);
  return (
    <div>
      <NavComponent />
      <MapComponent />
    </div>
  );
}

export default App;
