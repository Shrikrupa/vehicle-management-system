import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleTable from './VehicleTable';

function DisplayVehicle() {
    const [data, setData] = useState([]);

    function getAllVehicle() {
        axios({
            url: "http://localhost:3000/vehicles?count=20",
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
            {data?.length > 0 && <VehicleTable dtos={data} />}
        </>
    );
}

export default DisplayVehicle;