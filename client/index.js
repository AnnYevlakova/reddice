import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import jwt from "jsonwebtoken";

import App from "./components/app";
import Greetings from "./components/greetings";
import SignupPage from "./components/singup/signupPage";
import LoginPage from "./components/login/loginPage";
import NewEventPage from "./components/events/newEventPage";
import rootReducer from "./rootReducer";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { setCurrentUser } from "./actions/authActions";
import requireAuth from "./utils/requireAuth";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);
if (localStorage.jwtToken) {
    /*setAuthorizationToken(localStorage.jwtToken);*/
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Router>
            <dib>
                <Route path="/" component={App} />
                <Route exact path="/" component={Greetings} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/new-event" component={requireAuth(NewEventPage)} />
            </dib>
        </Router>
    </Provider>
    , document.getElementById("app"));
