import React from 'react';
import Button from "@material-ui/core/Button";
import moment from 'moment/moment';
import ReactTable from "react-table-v6";


export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
    }

    React.useEffect(() => {
        fetchData();
    }, []);



    const columns = [{
        Header: 'Activity',
        accessor: 'activity'
    }, {
        Header: 'Date',
        accessor: 'date',
        Cell: row => moment(row.value).format('DD/MM/YY, hh:mm')
    }, {
        Header: 'Duration (min)',
        accessor: 'duration',
    }, {
        Header: 'Firstname',
        accessor: 'customer.firstname'
    }, {
        Header: 'Lastname',
        accessor: 'customer.lastname'

    }];


    return (
        <div>
            <ReactTable className="App" data={trainings}
                columns={columns} sortable={true}
                defaultPageSize={20} />
        </div>
    );
}