import express from "express";
import isEmpty from "lodash/isEmpty";

import commonValidations from "../shared/validations/signup";

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data[0]);
    const users = data[1];
    const username = users.filter(item => item.username === data[0].username);
    const email = users.filter(item => item.email === data[0].email);

    if (username.length === 1) {
        errors.username = "There is user with such username";
    }
    if (email.length === 1) {
        errors.email = "There is user with such email";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

router.get("/:identifier", (req, res) => {
    console.log(22222222222, req);

});

router.post("/", (req, res) => {
    const { errors, isValid } = validateInput(req.body, commonValidations);

    if (isValid) {
        res.json({ success: true });
    } else {
        res.status(400).json(errors);
    }
});

export default router;
