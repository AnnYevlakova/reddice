import React from "react";

import LoginForm from "./loginForm";

class LoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-6 col-xs-offset-3 col-md-offset-4 col-sm-offset-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default LoginPage;
