class AbstractController {
    constructor() {
        const logger = require('../log');
        this.logger = new logger();
    }
    createPath = require('../helpers/create-path');
}

module.exports = AbstractController;