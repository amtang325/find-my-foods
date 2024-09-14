import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import NavComponent from "./components/NavComponent";
import MapComponent from "./components/MapComponent";
import "bulma/css/bulma.min.css";

function App() {

  return (
    <div>
      <NavComponent />
      <MapComponent />
    </div>
  );
}

export default App;
