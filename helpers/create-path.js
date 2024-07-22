const path = require('path');

function createPath(page) {
    return path.resolve(__dirname, '../views', `${page}.ejs`);
}

module.exports = createPath;