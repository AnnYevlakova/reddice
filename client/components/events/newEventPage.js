import React from "react";

import EventForm from "./eventForm";

class NewEventPage extends React.Component {
    render() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-6 col-xs-offset-3 col-md-offset-4 col-sm-offset-4">
                <EventForm />
            </div>
        );
    }
}
export default NewEventPage;
