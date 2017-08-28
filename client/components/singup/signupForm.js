import React from "react";
import map from "lodash/map";
import propTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";

import validateInput from "../../../server/shared/validations/signup";
import timezones from "../../timezone";
import TextFieldGroup from "../common/textFieldGroup";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            timezone: "",
            errors: {},
            isLoading: false,
            invalid: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists= this.checkUserExists.bind(this);
    }

    checkUserExists(e) {
        const field = e.target.name;
        const value = e.target.value;

        if (value !== "") {
            this.props.isUserExists([value, field]).then((res) => {
                let errors = this.state.errors;
                let invalid = this.state.invalid;

                if (res.user) {
                    errors[field] = `There is user with such ${field}`;
                    invalid = true;
                } else {
                    errors[field] = "";
                    invalid = false;
                }
                this.setState({ errors, invalid });
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state)
                .then(() => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You signed up successfully.",
                    });
                    this.context.router.history.push("/");
                    axios.post("https://5981a9d2139db000114a2d9c.mockapi.io/exampleUsers", {
                        username: this.state.username,
                        userId: this.state.username,
                        email: this.state.username,
                        password: this.state.username,
                        timezone: this.state.username,
                    });
                })
                .catch((error) => {
                    return this.setState({ errors: error.response.data, isLoading: false });
                });
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1 className="text-center">Join us</h1>

                <TextFieldGroup
                    errors={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />

                <TextFieldGroup
                    errors={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.email}
                    field="email"
                />

                <TextFieldGroup
                    errors={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                />

                <TextFieldGroup
                    errors={errors.passwordConfirmation}
                    label="password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    field="passwordConfirmation"
                />

                <div className={classnames("form-group", { "has-error": errors.timezone })}>
                    <label className="control-label">Timezone</label>
                    <select
                        type="text"
                        name="timezone"
                        value={this.state.timezone}
                        onChange={this.onChange}
                        className="form-control">
                        <option value="" disabled={this.state.isLoading}>Choose your timezone</option>
                        {map(timezones, (val, key) =>
                            <option key={val} value={val}>{key}</option>
                        )}
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone }</span>}
                </div>

                <div className="form-group">
                    <button
                        disabled={this.state.isLoading || this.state.invalid}
                        className="btn btn-primary btn-lg">
                        Sing up
                    </button>
                </div>

            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired,
};
SignupForm.contextTypes = {
    router: propTypes.object.isRequired,
};
export default SignupForm;
