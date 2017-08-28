import React from "react";
import propTypes from "prop-types";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";

import { userSignupRequest, isUserExists } from "../../actions/signupActions";
import { addFlashMessage } from "../../actions/flashMessages";

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage, isUserExists } = this.props;

        return (
            <div className="row">
                <h1 className="text-center">Sing up page</h1>
                <div className="col-md-4 col-sm-4 col-xs-6 col-xs-offset-3 col-md-offset-4 col-sm-offset-4">
                    <SignupForm
                        userSignupRequest={userSignupRequest}
                        history={this.props.history}
                        addFlashMessage={addFlashMessage}
                        isUserExists={isUserExists}
                    />
                </div>
            </div>

        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
    addFlashMessage: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired,
};

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
