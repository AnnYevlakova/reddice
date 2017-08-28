import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

import FlashMessage from "./flashMessage";
import { deleteFlashMessage } from "../../actions/flashMessages";

class FlashMessagesList extends React.Component {
    render() {
        return (
            <div>
                {this.props.messages.map(message => {
                    return <FlashMessage
                        key={message.id}
                        message={message}
                        deleteFlashMessage={this.props.deleteFlashMessage}
                    />;
                })}
            </div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: propTypes.array.isRequired,
    deleteFlashMessage: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
