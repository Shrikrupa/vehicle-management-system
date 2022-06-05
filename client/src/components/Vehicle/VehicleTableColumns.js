import { Link } from 'react-router-dom';

export const COLUMNS = [
    {
        Header: 'VIN',
        accessor: 'vin',
        id: 'vin',
    },
    {
        Header: 'Customer Name',
        accessor: 'customer_name',
        id: 'customer_name',
    },
    {
        Header: 'Office',
        accessor: 'office',
        id: 'office',
    },
    {
        Header: 'Licence Number',
        accessor: 'licence_plate',
        id: 'licence_plate',
    },
    {
        Header: 'Driver',
        accessor: 'driver',
        id: 'driver',
    },
    {
        Header: 'MMY',
        accessor: 'mmy',
        id: 'mmy',
    },
    {
        Header: 'Action',
        accessor: 'vin',
        id: 'action',
        Cell: ({ value }) => {
            return (
                <Link to={`/view/${value}`}>
                    <u style={{ color: "black" }}>Edit</u>
                </Link>
            )
        }
    }
]