import "./App.css";
import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import NavComponent from "./components/NavComponent";
import MapComponent from "./components/MapComponent";
import HomeComponent from "./components/HomeComponent";
import SearchComponent from "./components/SearchComponent";
import "bulma/css/bulma.min.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";


function App() {
  const { user } = useUser();
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  });
 
  if (user) {
    //console.log('user', user);
  }

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/getUsers', {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       console.log('users', response.data.users);
  //     } catch (error) {
  //       console.error('An error occurred:', error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

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
    <Router>
        <NavComponent />
        <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route path="/friends" element={<SearchComponent />} />
        </Routes>
    </Router>
  );
}

export default App;
