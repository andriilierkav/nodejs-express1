const mongoose = require('mongoose');
const {mongoDBUri} = require('../config');

async function connect() {
    mongoose.connect(mongoDBUri)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(error => console.log('Could not connect to MongoDB...', error));
}

module.exports = connect;