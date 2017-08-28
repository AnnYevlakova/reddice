import express from "express";
import jwt from "jsonwebtoken";
import config from "../config";

let router = express.Router();

router.post("/", (req, res) => {
    const { identifier, password } = req.body[1];
    const users = req.body[0];

    const usernameData = users.filter(item => item.username === identifier);
    const emailData = users.filter(item => item.email === identifier);
    const user = usernameData || emailData;

    if (user.length) {
        if (user[0].password === password) {
            const token = jwt.sign({ username: user[0].username }, config.jwtSecret);
            res.json({ token });
        } else {
            res.status(401).json({ errors: { form: "Invalid Credentials" } });
        }
    } else {
        res.status(401).json({ errors: { form: "Invalid Credentials" } });
    }
});

export default router;
