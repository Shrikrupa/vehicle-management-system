import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditVehicle() {
    const [customerName, setCustomerName] = useState('');
    const [driverName, setDriverName] = useState('');
    const [licence, setLicence] = useState('');
    const [office, setOffice] = useState('');
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const { id } = useParams();

    function updateDetails() {
        setUpdating(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ office: office, customer: customerName, driver: driverName, licence: licence })
        };
        fetch(`http://localhost:3000/vehicles/${id}`, requestOptions)
            .then(response => {
                setUpdating(false);
            })
            .then(data => {
                setUpdating(false);
            });
    }

    function getVehicleById() {
        setLoading(true);
        axios({
            url: `http://localhost:3000/vehicle/${id}`,
            method: "GET",
        })
            .then((res) => {
                setCustomerName(res.data[0].customer_name);
                setDriverName(res.data[0].driver);
                setLicence(res.data[0].licence_plate)
                setOffice(res.data[0].office);
                setLoading(false);
            })
            .catch((err) => {
                console.log('err', err);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (id !== null || id !== undefined) {
            getVehicleById();
        }
        // eslint-disable-next-line
    }, [id]);

    return (
        <>
            {loading === true ?
                <p> Loadingg....</p> :
                <>
                    <form>
                        <h2 style={{ textAlign: "center" }}>Edit Vehicle Data</h2>
                        <h4 style={{ textAlign: "center" }}>VIN: {id}</h4>
                        <label>
                            Customer:
                            <input style={{ marginLeft: "2rem" }} value={customerName} placeholder={"Customer Name"} onChange={(e) => setCustomerName(e.target.value)} /><br />
                        </label>
                        <label>
                            Driver:
                            <input style={{ marginLeft: "3.6rem" }} value={driverName} placeholder={"Driver Name"} onChange={(e) => setDriverName(e.target.value)} /><br />
                        </label>
                        <label>
                            Licence:
                            <input style={{ marginLeft: "3rem" }} value={licence} placeholder={"Licence"} onChange={(e) => setLicence(e.target.value)} /><br />
                        </label>
                        <label>
                            Office:
                            <input style={{ marginLeft: "3.6rem" }} value={office} placeholder={"Office"} onChange={(e) => setOffice(e.target.value)} /><br />
                        </label>
                        <button
                            style={{ border: "3px solid black", alignSelf: "center", backgroundColor: "#0ace27", padding: "0.7rem", width: "5rem", marginLeft: "10rem", marginTop: "1rem" }}
                            onClick={updateDetails}
                        >
                            Update
                        </button>
                        <span>
                            {updating === true
                                ? 'in progress...'
                                : (
                                    updating === false ? '' : null
                                )
                            }
                        </span>
                    </form>

                </>
            }

        </>
    )
}
export default EditVehicle;