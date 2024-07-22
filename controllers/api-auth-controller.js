const Logger = require('../log');
const logger = new Logger();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');

const jwt = require('jsonwebtoken');
const {secret} = require('../config');

class ApiAuthController {
    generateAccessToken = async (id, roles) => {
        const payload = {
            id,
            roles
        }

        return jwt.sign(payload, secret, {expiresIn: '1h'});
    }
    validate = (username, password) => {
        if (username.length < 4) {
            throw new Error('Username must be at least 4 characters long');
        }

        if (password.length < 4) {
            throw new Error('Password must be at least 4 characters long');
        }
    }

    register = async (req, res) => {
        try {
            const {username, password} = req.body;

            this.validate(username, password);

            const user = await User.findOne({username});
            if(user) {
                res.status(400).json({'status': 'error', message: `Username ${username} already exists`});
            }

            const userRole = Role.findOne({value: 'USER'});
            const hashedPassword = await bcrypt.hash(password, 4);
            const newUser = new User({username: username, password: hashedPassword, roles: [userRole]});
            await newUser.save();

            res.status(200).json({'status': 'success'});
        } catch (error) {
            logger.log(error);
            res.status(500).json({'status': 'error', message: 'Registration Error: ' + error.message});
        }
    }

    login = async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(user) {
                const validPassword = bcrypt.compareSync(password, user.password);
                if(validPassword) {
                    const token = await this.generateAccessToken(username, password);
                    res.status(200).json({'status': 'success', token: token});
                }
            }

            res.status(400).json({'status': 'error', message: "username or password is incorrect"});
        } catch (error) {
            logger.log(error);
            res.status(500).json({'status': 'error', message: "Login Error: " + error.message});
        }
    }
}

module.exports = new ApiAuthController;