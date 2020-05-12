import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment/moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarView() {

    const localizer = momentLocalizer(moment);
    const [list, setList] = React.useState([]);


    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setList(responseData);
            })
    }

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Calendar
                localizer={localizer}
                events={list}
                style={{ height: 800 }}
                titleAccessor={(event) => {
                    return moment(event.date).toDate().getHours() + ":" + moment(event.date).toDate().getMinutes() + " - "
                        + moment(event.date).add(event.duration, "minutes").toDate().getHours() + ":" + moment(event.date).toDate().getMinutes()
                        + " \n" + event.activity + " / " + event.customer.firstname + " " + event.customer.lastname;
                }}
                startAccessor={startTime => moment(startTime.date).toDate()}
                endAccessor={endTime => moment(endTime.date).add(endTime.duration, "minutes").toDate()}
            />
        </div>
    );
}

export default CalendarView;