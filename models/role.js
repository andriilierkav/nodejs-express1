const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    value: {type: String, required: true, unique: true},
})

module.exports = model("Role", roleSchema);