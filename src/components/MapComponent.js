import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "bulma/css/bulma.min.css";
import {
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";
function MapComponent() {
  const [viewState, setViewState] = useState({
    longitude: -71.09,
    latitude: 42.36,
    zoom: 16,
  });

  const { user } = useUser();

  const [id, setId] = useState(0);
  const [addMarker, setAddMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [editMarkerId, setEditMarkerId] = useState(null);

  const [markerTitle, setMarkerTitle] = useState("");
  const [markerDescription, setMarkerDescription] = useState("");
  const [editMarkerTitle, setEditMarkerTitle] = useState("");
  const [editMarkerDescription, setEditMarkerDescription] = useState("");

  const plotCurrentLocation = (position) => {
    let { coords } = position;
    setUserLocation({
      longitude: coords.longitude,
      latitude: coords.latitude,
    });

    setViewState(prevState => ({
      ...prevState,
      longitude: coords.longitude,
      latitude: coords.latitude
    })
    );

    // Add a marker for the user's location
    const userMarker = {
      name: "My Location",
      description: "You are here",
      lng: coords.longitude,
      lat: coords.latitude,
    };

    setMarkers((prevMarkers) => [...prevMarkers, userMarker]);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(plotCurrentLocation);
  });

  const handleAddMarker = () => {
    setMarkerTitle(document.getElementById("marker-title").value);
    setMarkerDescription(document.getElementById("marker-description").value);
    setAddMarker(true);
    setIsAddModalOpen(false);
  };

  const handleEditMarker = (id) => {
    setIsEditModalOpen(true);
    setEditMarkerId(id);
  };

  const handleDeleteMarker = (id) => {
    setMarkers(oldValues => {
      return oldValues.filter(marker => marker.id !== id);
    })
    setSelectedMarker(null);
  };

  const updateSelectedMarker = () => {
    // setEditMarkerTitle(document.getElementById("edit-marker-title").value);
    // setEditMarkerDescription(document.getElementById("edit-marker-description").value);

    // console.log(editMarkerTitle, editMarkerDescription);

    selectedMarker.name = document.getElementById("edit-marker-title").value;
    selectedMarker.description = document.getElementById("edit-marker-description").value;
    setIsEditModalOpen(false);
  }

  const handleMapClick = async (e) => {
    if (addMarker) {
      const newMarker = {
        name: markerTitle,
        description: markerDescription,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        id: id,
        userId: user.id
      };
      setId(id + 1);
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setAddMarker(false);
      
      try {
        const response = await axios.post('http://localhost:3000/', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      setSelectedMarker(null);
    }
  };

  return (
    <div>
      <div className="sidebar absolute z-10 top-0 left-0 m-12 mt-20 rounded-md pointer-events-all">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={`button is-success is-rounded ${
            addMarker ? "is-loading" : ""
          }`}
        >
          New Spot
        </button>
      </div>

      <div className="map-container">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          mapboxAccessToken="pk.eyJ1IjoiZmlyZWZhbGwiLCJhIjoiY2tid3Vvam1lMGpsMDMxcnY2Zm9zNndpaSJ9.ohtzDt76DqFRX0324y7F9g"
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.lng}
              latitude={marker.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedMarker(marker);
              }}
            />
          ))}
          {selectedMarker && (
            <Popup
              longitude={selectedMarker.lng}
              latitude={selectedMarker.lat}
              anchor="bottom"
              onClose={() => setSelectedMarker(null)}
              closeButton={false}
            >
              <div className="bg-white p-2 rounded-md text-center">
                <h3 className="text-lg font-bold text-black">
                  {selectedMarker.name}
                </h3>
                <p className="text-sm text-black">
                  {selectedMarker.description}
                </p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditMarker(selectedMarker.id)}
                    className="button is-warning is-small is-rounded mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMarker(selectedMarker.id)}
                    className="button is-danger is-small is-rounded ml-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>

      <div className={`modal ${isAddModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Short Description</label>
              <div className="control">
                <input
                  id="marker-title"
                  className="input"
                  type="text"
                  placeholder="Enter marker title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Any More Info?</label>
              <div className="control">
                <textarea
                  id="marker-description"
                  className="textarea"
                  placeholder="Enter marker description"
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-success" onClick={handleAddMarker}>
                  Add Marker
                </button>
              </div>
            </div>
            <div className="field">
              <p className="help">
                Note: Once you click "Add Marker", click on the map where you
                want to drop it.
              </p>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsAddModalOpen(false)}
        ></button>
      </div>

      <div className={`modal ${isEditModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Short Description</label>
              <div className="control">
                <input
                  id="edit-marker-title"
                  className="input"
                  type="text"
                  placeholder="Enter marker title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Any More Info?</label>
              <div className="control">
                <textarea
                  id="edit-marker-description"
                  className="textarea"
                  placeholder="Enter marker description"
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-success" onClick={updateSelectedMarker}>
                  Edit Marker
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsEditModalOpen(false)}
        ></button>
      </div>
    </div>
  );
}

export default MapComponent;
