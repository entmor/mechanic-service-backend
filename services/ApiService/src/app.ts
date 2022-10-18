import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import helmet from 'helmet';

import routes from './v1/routes';

const app = express();

//SECURITY
app.disable('x-powered-by');
app.use(helmet());

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

// ROUTES
app.use('/v1', routes);

// 404
app.use('*', function (req, res) {
    res.status(404).json({
        http_code: 404,
        message: 'Wrong URL',
    });
});

app.on('error', function (app) {
    console.log('error');
});

export const App = app;
