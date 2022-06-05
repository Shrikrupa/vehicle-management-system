import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState([]);
    const [activePark, setActivePark] = useState();

    function getAllVehicle() {
        axios({
            url: "http://localhost:3000/vehicles?count=30",
            method: "GET",
        })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => { console.log('err', err) });
    }

    useEffect(() => {
        getAllVehicle();
    }, []);

    return (
        <>
            <body>
                <MapContainer center={[13.082680, 80.270721]} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {data.map((item) => (
                        <>
                            <Marker key={item.vin} position={[item.status.location.lat, item.status.location.lon]}
                                eventHandlers={{
                                    click: () => {
                                        console.log('marker clicked')
                                        setActivePark(item)
                                    },
                                }}
                            />
                        </>
                    ))}
                    {activePark && <Popup position={[activePark.status.location.lat, activePark.status.location.lon]} onClose={() => {
                        setActivePark(null);
                    }}>
                        <div>
                            <h4>VIN: {activePark.vin}</h4>
                            <b>Speed: {activePark.status.speed}mph</b>
                            <p>Lat: {activePark.status.location.lat}</p>
                            <p>Lon: {activePark.status.location.lon}</p>
                        </div>
                    </Popup>}
                </MapContainer>
            </body>
        </>
    );
}
export default Dashboard;