const express = require('express');
const app = express();
const Logger = require('./log');
const logger = new Logger();

const PORT = 3000;

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const apiPostRoutes = require('./routes/api-post-routes');
const apiAuthRoutes = require('./routes/api-auth-routes');
const dbConnection = require('./db/mongodb-connection');

dbConnection();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, (error) => {
    error ? logger.log('Error: ' + error) : logger.log(`Server is listening on port ${PORT}...`);
});

app.use((req, res, next) => {
    logger.logToFile(`Request URL: ${req.url}`, 'access.log');
    next();
})

app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', (req, res) => {
    const title = 'Home Page';
    res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

app.use(apiAuthRoutes);
app.use(postRoutes);
app.use(contactRoutes);
app.use(apiPostRoutes);

app.use((req, res) => {
    const title = '404 page'
    res.status(404).render(createPath('error'), { title });
})