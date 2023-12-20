// Dashboard.js
import React from "react";
import { useState, useEffect, useContext } from "react";
import "./leaflet-style.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  WMSTileLayer,
  Polygon
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  // event.preventDefault();
  const customIcon = new Icon({
    iconUrl: require("../assets/images/location-pin.png"),
    iconSize: [38, 38],
  });

  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: [33, 33],
    });
  };

  const [markersData, setMarkersData] = useState([]);
  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  // const { user } = React.useContext(AuthContext);
  const { user } = useAuth();
  console.log(user)
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let apiUrl = `${process.env.REACT_APP_SERVER_URL}/admin/allProjects`;

      // Apply filters if they are set
      if (filterState || filterDistrict || filterVillage) {
        apiUrl = `${process.env.REACT_APP_SERVER_URL}/admin/projects`;

        const filterParams = {};
        if (filterState) filterParams.state = filterState;
        if (filterDistrict) filterParams.district = filterDistrict;
        if (filterVillage) filterParams.village = filterVillage;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filterParams),
        });

        const data = await response.json();

        if (data) {
          setMarkersData(data.data);
          console.log(data);
        }
      } else {
        // Fetch all projects if no filters are applied
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data) {
          console.log(data);
          setMarkersData(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApplyFilters = () => {
    fetchData();
  };
  React.useEffect(() => {
    console.log(user)
    if (!user) {
      navigate('/login')
    }
  }, [user])
  function handle_dashboard() {
    navigate('/dashboard')
  }

  return (
    <>
      {user ?
      <>
      <button onClick={handle_dashboard}>dashboard</button>
      <div style={{ height: "100vh", margin: 0, padding: 0, width: "100%" }}>
          <div>
            <label>
              State:
              <input type="text" value={filterState} onChange={(e) => setFilterState(e.target.value)} />
            </label>
            <label>
              District:
              <input type="text" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)} />
            </label>
            <label>
              Village:
              <input type="text" value={filterVillage} onChange={(e) => setFilterVillage(e.target.value)} />
            </label>
            <button onClick={handleApplyFilters}>Apply Filters</button>
          </div>
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
              {markersData.map((marker, index) => (
                <Marker
                  key={index}
                  position={[marker.location.coordinates[1], marker.location.coordinates[0]]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <h3>{marker.project_name}</h3>
                      <p>Start: {marker.project_start}</p>
                      <p>End: {marker.project_end}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div></>
        : null}
    </>
  );
}

export default Map;