const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
router.post("/signup", async (req, res) => {
    try {
        const { username, password, name } = req.body;

        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            const hashPassword = await bcrypt.hash(password, 10);
            let newUser = new User({
                username: username,
                password: hashPassword,
                name: name
            });

            newUser = await newUser.save();

            res.status(200).json({
                success: true,
                data: newUser
            });

        }
        else {
            res.status(201).json({
                message: 'username not available'
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);
            if (match) {
                res.status(200).json({
                    success: true,
                    data: existingUser
                })
            } else {
                res.status(201).json({ message: 'Wrong password.' });
            }
        } else {
            res.status(201).json({ message: 'User with the username does not exist .' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/signupgoogle', async (req, res) => {
    try {
        const { name, email } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            // do signup
            let newUser = new User(req.body);
            newUser = await newUser.save();
            res.status(200).json({ data: newUser });
        }
        res.status(201).json({ data: existingUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;