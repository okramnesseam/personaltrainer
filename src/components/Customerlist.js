import React, { useState, useEffect } from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import Addtraining from "./Addtraining";


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    };

    const handleClose = () => {
        setOpen(false);
    }

    function deleteCustomer(link) {
        console.log(link)

        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getCustomers())
                .catch(err => console.error(err))

        }
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => getCustomers())
            .catch(err => console.log(err))
    };

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('New customer added');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    function addTraining(training) {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => getCustomers())
            .catch(err => console.log(err))
    }



    const columns = [

        {
            Header: "First name",
            accessor: "firstname"
        },
        {
            Header: "Last name",
            accessor: "lastname"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Phone",
            accessor: "phone"
        },
        {
            Header: "Address",
            accessor: "streetaddress"
        },
        {
            Header: "Postcode",
            accessor: "postcode"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => (<Button color="secondary" size="small"
                onClick={() => deleteCustomer(row.row._original.links[1].href)}>Delete</Button>)
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => (<Editcustomer editCustomer={editCustomer} customer={row.row._original} />)
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => (<Addtraining addTraining={addTraining} customer={row.row._original} />)
        }
    ];

    return (
        <div>
            <Addcustomer addCustomer={addCustomer}></Addcustomer>
            <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns} sortable={true} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            />
        </div>
    );
}